self.importScripts(
  "../../node_modules/promise-worker/dist/promise-worker.register.min.js"
);

registerPromiseWorker(function(data) {
  importScripts(data.path + "/localized-readability.min.js");
  const Highlighter = LocalizedReadability.highlighter;
  const highlight = Highlighter.highlight(data.nlcst, {
    paragraphs: true
  });
  return highlight;
});
