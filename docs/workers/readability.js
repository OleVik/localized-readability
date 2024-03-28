/* @see https://unpkg.com/promise-worker@2.0.1/dist/promise-worker.register.js */
/* eslint-disable */
function isPromise(obj) {
  // via https://unpkg.com/is-promise@2.1.0/index.js
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}

function registerPromiseWorker(callback) {
  function postOutgoingMessage(e, messageId, error, result) {
    function postMessage(msg) {
      /* istanbul ignore if */
      if (typeof self.postMessage !== "function") {
        // service worker
        e.ports[0].postMessage(msg);
      } else {
        // web worker
        self.postMessage(msg);
      }
    }
    if (error) {
      /* istanbul ignore else */
      if (typeof console !== "undefined" && "error" in console) {
        // This is to make errors easier to debug. I think it's important
        // enough to just leave here without giving the user an option
        // to silence it.
        console.error("Worker caught an error:", error);
      }
      postMessage([
        messageId,
        {
          message: error.message,
        },
      ]);
    } else {
      postMessage([messageId, null, result]);
    }
  }

  function tryCatchFunc(callback, message) {
    try {
      return { res: callback(message) };
    } catch (e) {
      return { err: e };
    }
  }

  function handleIncomingMessage(e, callback, messageId, message) {
    var result = tryCatchFunc(callback, message);

    if (result.err) {
      postOutgoingMessage(e, messageId, result.err);
    } else if (!isPromise(result.res)) {
      postOutgoingMessage(e, messageId, null, result.res);
    } else {
      result.res.then(
        function (finalResult) {
          postOutgoingMessage(e, messageId, null, finalResult);
        },
        function (finalError) {
          postOutgoingMessage(e, messageId, finalError);
        }
      );
    }
  }

  function onIncomingMessage(e) {
    var payload = e.data;
    if (!Array.isArray(payload) || payload.length !== 2) {
      // message doens't match communication format; ignore
      return;
    }
    var messageId = payload[0];
    var message = payload[1];

    if (typeof callback !== "function") {
      postOutgoingMessage(
        e,
        messageId,
        new Error("Please pass a function into register().")
      );
    } else {
      handleIncomingMessage(e, callback, messageId, message);
    }
  }

  self.addEventListener("message", onIncomingMessage);
}

registerPromiseWorker(function (data) {
  importScripts(
    `${data.path}/hypher.js`,
    `${data.path}/patterns/${data.language}.js`,
    `${data.path}/annotations/language.${data.annotations}.js`,
    `${data.path}/localized-readability.min.js`
  );
  const Parser = LocalizedReadability.parser;
  var message = {};
  message.setup = Parser.setup(data.input, Hypher, HyphenationPatterns);
  message.count = Parser.count(message.setup);
  message.statistics = Parser.statistics(message.count, data.language);
  message.interpretations = Parser.interpretations(
    message.count,
    message.statistics,
    Annotations
  );
  message.consensus = Parser.consensus(message.interpretations);
  return message;
});
