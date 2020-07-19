/* eslint-disable */
self.importScripts(
  "../../node_modules/promise-worker/dist/promise-worker.register.min.js"
);

registerPromiseWorker(function (data) {
  importScripts(
    `${data.path}/hypher.js`,
    `${data.path}/patterns/${data.lang}.js`,
    `${data.path}/localized-readability.min.js`
  );
  const Highlighter = LocalizedReadability.highlighter;
  const highlight = Highlighter.highlight(data.nlcst, {
    paragraphs: false,
    sentences: false,
    words: true,
    Hypher: Hypher,
    HyphenationPatterns: HyphenationPatterns,
  });
  return highlight;
});
