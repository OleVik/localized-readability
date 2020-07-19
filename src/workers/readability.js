self.importScripts(
  "../../node_modules/promise-worker/dist/promise-worker.register.min.js"
);

registerPromiseWorker(function(data) {
  importScripts(
    data.path + "/hypher.js",
    data.path + `/patterns/${data.lang}.js`,
    data.path + `/annotations/language.${data.lang}.js`,
    data.path + "/localized-readability.min.js"
  );
  const Parser = LocalizedReadability.parser;
  var message = {};
  message.setup = Parser.setup(data.input, Hypher, HyphenationPatterns);
  message.count = Parser.count(message.setup);
  message.statistics = Parser.statistics(message.count, data.lang);
  message.interpretations = Parser.interpretations(
    message.count,
    message.statistics,
    Annotations
  );
  message.consensus = Parser.consensus(message.interpretations);
  return message;
});
