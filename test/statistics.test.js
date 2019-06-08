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
});
describe("Statistics", () => {
  test("Bootstrap", () => {
    global.statistics = parser.statistics(global.count, global.lang);
    expect(typeof global.statistics).toBe("object");
  });
  test("Automated Readability Index", () => {
    expect(typeof global.statistics.automatedReadability).toBe("number");
    expect(global.statistics.automatedReadability).toBeTruthy();
  });
  test("Flesch Reading Ease", () => {
    expect(typeof global.statistics.flesch).toBe("number");
    expect(global.statistics.flesch).toBeTruthy();
  });
  test("Flesch-Kincaid Grade-level", () => {
    expect(typeof global.statistics.fleschKincaid).toBe("number");
    expect(global.statistics.fleschKincaid).toBeTruthy();
  });
  test("Coleman-Liau Grade-level", () => {
    expect(typeof global.statistics.colemanLiau).toBe("number");
    expect(global.statistics.colemanLiau).toBeTruthy();
  });
  test("Simple Measure of Gobbledygook", () => {
    expect(typeof global.statistics.smog).toBe("number");
    expect(global.statistics.smog).toBeTruthy();
  });
  test("Lasbarhetsindex", () => {
    expect(typeof global.statistics.lix).toBe("number");
    expect(global.statistics.lix).toBeTruthy();
  });
  test("Anderson's Readability Index", () => {
    expect(typeof global.statistics.rix).toBe("number");
    expect(global.statistics.rix).toBeTruthy();
  });
});
