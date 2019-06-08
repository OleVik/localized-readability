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
  global.count = parser.count(global.setup);
  global.statistics = parser.statistics(global.count, global.lang);
  global.annotations = require(`../annotations/language.${global.lang}.js`);
});
describe("Statistics", () => {
  test("Bootstrap", () => {
    global.interpretations = parser.interpretations(
      global.count,
      global.statistics,
      global.annotations
    );
    expect(typeof global.interpretations).toBe("object");
  });
  test("Automated Readability Index", () => {
    expect(typeof global.interpretations.automatedReadability.grade).toBe(
      "number"
    );
    expect(global.interpretations.automatedReadability.grade).toBeGreaterThan(
      0
    );
    expect(typeof global.interpretations.automatedReadability.age).toBe(
      "number"
    );
    expect(global.interpretations.automatedReadability.age).toBeGreaterThan(0);
  });
  test("Flesch Reading Ease", () => {
    expect(typeof global.interpretations.flesch).toBe("string");
    expect(global.interpretations.flesch.length).toBeGreaterThan(0);
  });
  test("Flesch-Kincaid Grade-level", () => {
    expect(typeof global.interpretations.fleschKincaid.grade).toBe("number");
    expect(global.interpretations.fleschKincaid.grade).toBeGreaterThan(0);
    expect(typeof global.interpretations.fleschKincaid.age).toBe("number");
    expect(global.interpretations.fleschKincaid.age).toBeGreaterThan(0);
  });
  test("Coleman-Liau Grade-level", () => {
    expect(typeof global.interpretations.colemanLiau.grade).toBe("number");
    expect(global.interpretations.colemanLiau.grade).toBeGreaterThan(0);
    expect(typeof global.interpretations.colemanLiau.age).toBe("number");
    expect(global.interpretations.colemanLiau.age).toBeGreaterThan(0);
  });
  test("Simple Measure of Gobbledygook", () => {
    expect(typeof global.interpretations.smog.grade).toBe("number");
    expect(global.interpretations.smog.grade).toBeGreaterThan(0);
    expect(typeof global.interpretations.smog.age).toBe("number");
    expect(global.interpretations.smog.age).toBeGreaterThan(0);
  });
  test("Lasbarhetsindex", () => {
    expect(typeof global.interpretations.lix).toBe("string");
    expect(global.interpretations.lix.length).toBeGreaterThan(0);
  });
  test("Anderson's Readability Index", () => {
    expect(typeof global.interpretations.rix.grade).toBe("number");
    expect(global.interpretations.rix.grade).toBeGreaterThan(0);
  });
});
