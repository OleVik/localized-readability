const parser = require("../src/parser"),
  Highlighter = require("../src/highlighter"),
  Hypher = require("hypher");
require("dotenv").config();

beforeAll(function() {
  global.simpleData = require(process.env.TEST_DATA + "/simple");
  global.lang = process.env.TEST_LANG;
  global.patterns = require(`@fluid-project/hyphenation-patterns/patterns/${
    global.lang
  }.js`);
  global.setup = parser.setup(global.simpleData[lang], Hypher, global.patterns);
});
test("Highlighter", () => {
  const highlight = Highlighter.highlight(global.setup.nlcst, {
    paragraphs: true,
    sentences: true
  });
  const highlighted = Highlighter.stringify(highlight);
  expect(typeof highlight).toBe("object");
  expect(highlight.type).toBe("RootNode");
  expect(Array.isArray(highlight.children)).toBe(true);
  expect(typeof highlighted).toBe("string");
  expect(highlighted.length).toBeGreaterThan(0);
});
