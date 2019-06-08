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
  global.interpretations = parser.interpretations(
    global.count,
    global.statistics,
    global.annotations
  );
});
test("Consensus", () => {
  const consensus = parser.consensus(global.interpretations);
  expect(typeof consensus).toBe("object");
  expect(typeof consensus.grade).toBe("number");
  expect(consensus.grade).toBeGreaterThan(0);
  expect(typeof consensus.age).toBe("number");
  expect(consensus.age).toBeGreaterThan(0);
});
