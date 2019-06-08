const parser = require("../src/parser"),
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
describe("Setup", () => {
  test("Bootstrap", () => {
    global.count = parser.count(global.setup);
    expect(typeof global.count).toBe("object");
  });
  test("Letters", () => {
    expect(typeof global.count.letters).toBe("number");
    expect(global.count.letters).toBeGreaterThan(0);
  });
  test("Characters", () => {
    expect(typeof global.count.characters).toBe("number");
    expect(global.count.characters).toBeGreaterThan(0);
  });
  test("Whitespaces", () => {
    expect(typeof global.count.whitespaces).toBe("number");
    expect(global.count.whitespaces).toBeGreaterThan(0);
  });
  test("Paragraphs", () => {
    expect(typeof global.count.paragraphs).toBe("number");
    expect(global.count.paragraphs).toBeGreaterThan(0);
  });
  test("Sentences", () => {
    expect(typeof global.count.sentences).toBe("number");
    expect(global.count.sentences).toBeGreaterThan(0);
  });
  test("Words", () => {
    expect(typeof global.count.words).toBe("number");
    expect(global.count.words).toBeGreaterThan(0);
  });
  test("Long words", () => {
    expect(typeof global.count.longwords).toBe("number");
    expect(global.count.longwords).toBeGreaterThan(0);
  });
  test("Periods", () => {
    expect(typeof global.count.periods).toBe("number");
    expect(global.count.periods).toBeGreaterThan(0);
  });
  test("Punctuations", () => {
    expect(typeof global.count.punctuations).toBe("number");
    expect(global.count.punctuations).toBeGreaterThan(0);
  });
  test("Syllables", () => {
    expect(typeof global.count.syllables).toBe("number");
    expect(global.count.syllables).toBeGreaterThan(0);
  });
  test("Polysillabic words", () => {
    expect(typeof global.count.polysillabicWords).toBe("number");
    expect(global.count.polysillabicWords).toBeGreaterThan(0);
  });
});
