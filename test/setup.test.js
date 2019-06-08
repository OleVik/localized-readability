const parser = require("../src/parser"),
  Hypher = require("hypher");
require("dotenv").config();

beforeAll(function() {
  global.simpleData = require(process.env.TEST_DATA + "/simple");
  global.lang = process.env.TEST_LANG;
  global.patterns = require(`../node_modules/@fluid-project/hyphenation-patterns/patterns/${
    global.lang
  }.js`);
});
describe("Setup", () => {
  test("Bootstrap", () => {
    global.setup = parser.setup(
      global.simpleData[lang],
      Hypher,
      global.patterns
    );
    expect(typeof global.setup).toBe("object");
  });
  test("NLCST", () => {
    expect(global.setup.nlcst.type).toBe("RootNode");
    expect(Array.isArray(global.setup.nlcst.children)).toBe(true);
  });
  test("NLCST to string", () => {
    expect(typeof global.setup.nlcstString).toBe("string");
  });
  test("TextNodes", () => {
    expect(Array.isArray(global.setup.textNodes)).toBe(true);
    expect(global.setup.textNodes.length).toBeGreaterThan(0);
  });
  test("SentenceNodes", () => {
    expect(Array.isArray(global.setup.sentenceNodes)).toBe(true);
    expect(global.setup.sentenceNodes.length).toBeGreaterThan(0);
  });
  test("Syllables", () => {
    expect(typeof global.setup.syllables).toBe("object");
    expect(typeof global.setup.syllables.syllables).toBe("number");
    expect(global.setup.syllables.syllables).toBeGreaterThan(0);
    expect(typeof global.setup.syllables.polysillabicWords).toBe("number");
    expect(global.setup.syllables.polysillabicWords).toBeGreaterThan(0);
  });
});
