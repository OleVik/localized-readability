/**
 * Parse data for use in generating readability statistics
 * @module Parser
 */

const vfile = require("vfile"),
  remark = require("remark"),
  Latin = require("parse-latin"),
  MDASTtoNLCST = require("mdast-util-to-nlcst"),
  NLCSTtoString = require("nlcst-to-string"),
  selectAll = require("unist-util-select").selectAll,
  automatedReadability = require("automated-readability"),
  fleschKincaid = require("flesch-kincaid"),
  colemanLiau = require("coleman-liau"),
  smogFormula = require("smog-formula"),
  compute = require("./computors"),
  interpret = require("./interpretors"),
  utilities = require("./utilities");

/**
 * Setup options and parse
 * @param {string} input String to parse
 * @param {object} Hypher Hypher instance
 * @param {object} patterns Hyphenations patterns
 * @returns {object}
 */
function setup(input, Hypher, patterns) {
  if (typeof input != "string" || input.length < 1) {
    throw new TypeError("Parameter 'input' must be a non-empty string");
  }
  try {
    var tree = remark().parse(input);
    var nlcst = MDASTtoNLCST(tree, vfile(input), Latin);
    var nlcstString = NLCSTtoString(nlcst);
    var textNodes = selectAll("TextNode", nlcst);
    var sentenceNodes = selectAll("SentenceNode", nlcst);
    var syllables = utilities.countSyllables(textNodes, Hypher, patterns);
  } catch (error) {
    throw new Error(error);
  }
  return {
    tree: tree,
    nlcst: nlcst,
    nlcstString: nlcstString,
    textNodes: textNodes,
    sentenceNodes: sentenceNodes,
    syllables: syllables
  };
}
/**
 * Count various descriptives in text
 * @param {object} data Static data from parsing
 * @returns {object}
 */
function count(data) {
  if (typeof data != "object" || Object.keys(data).length < 1) {
    throw new TypeError("Parameter 'data' must be a non-empty object");
  }
  return {
    roots: selectAll("RootNode", data.nlcst).length,
    letters: data.nlcstString.match(/[ÆØÅæøåA-Za-z0-9]/g).join("").length,
    characters: data.nlcstString.length,
    whitespaces: selectAll("WhiteSpaceNode", data.nlcst).length,
    paragraphs: selectAll("ParagraphNode", data.nlcst).length,
    sentences: data.sentenceNodes.length,
    words: selectAll("WordNode", data.nlcst).length,
    longwords: data.textNodes.filter(function(item) {
      return item.value.length > 6;
    }).length,
    periods: utilities.countPeriods(data.nlcstString),
    punctuations: selectAll("PunctuationNode", data.nlcst).length,
    syllables: data.syllables.syllables,
    polysillabicWords: data.syllables.polysillabicWords
  };
}

/**
 * Calculate readability statistics from text
 * @param {object} count Descriptive data from text
 * @param {string} lang Language to use
 * @returns {object}
 */
function statistics(count, lang) {
  if (typeof count != "object" || Object.keys(count).length < 1) {
    throw new TypeError("Invalid input: count");
  }
  if (typeof lang != "string" || lang.length < 1) {
    throw new TypeError("Invalid input: lang");
  }
  return {
    automatedReadability: Math.ceil(
      automatedReadability({
        sentence: count.sentences,
        word: count.words,
        character: count.letters
      })
    ),
    flesch: parseFloat(
      compute
        .Flesch(
          {
            sentences: count.sentences,
            words: count.words,
            syllables: count.syllables
          },
          lang
        )
        .toFixed(1)
    ),
    fleschKincaid: Math.floor(
      fleschKincaid({
        sentence: count.sentences,
        word: count.words,
        syllable: count.syllables
      })
    ),
    colemanLiau: parseFloat(
      colemanLiau({
        sentence: count.sentences,
        word: count.words,
        letter: count.letters
      }).toFixed(1)
    ),
    smog: parseFloat(
      smogFormula({
        sentence: count.sentences,
        polysillabicWord: count.polysillabicWords
      }).toFixed(1)
    ),
    lix: Math.round(
      compute.LIX({
        words: count.words,
        periods: count.periods,
        longwords: count.longwords
      })
    ),
    rix: parseFloat(
      compute
        .RIX({
          sentences: count.sentences,
          longwords: count.longwords
        })
        .toFixed(2)
    )
  };
}

/**
 * Calculate and interpret statistics
 * @param {object} count Descriptive statistics
 * @param {object} stats Calculated statistics
 * @param {object} annotations Localized annotations
 * @returns {object}
 */
function interpretations(count, stats, annotations) {
  if (typeof count != "object" || Object.keys(count).length < 1) {
    throw new TypeError("Parameter 'count' must be a non-empty object");
  }
  if (typeof stats != "object" || Object.keys(stats).length < 1) {
    throw new TypeError("Parameter 'stats' must be a non-empty object");
  }
  if (typeof annotations != "object" || Object.keys(annotations).length < 1) {
    throw new TypeError("Parameter 'annotations' must be a non-empty object");
  }
  const gradeModifier = annotations.modifier.grade.constant;
  return {
    automatedReadability: {
      grade: stats.automatedReadability,
      age: stats.automatedReadability + gradeModifier
    },
    flesch: interpret.Flesch(stats.flesch, annotations),
    fleschKincaid: {
      grade: stats.fleschKincaid,
      age: stats.fleschKincaid + gradeModifier
    },
    colemanLiau: {
      grade: stats.colemanLiau,
      age: stats.colemanLiau + gradeModifier
    },
    smog: {
      grade: stats.smog,
      age: interpret.SMOG(stats.smog, count.words, gradeModifier)
    },
    lix: interpret.LIX(stats.lix, annotations),
    rix: {
      grade: interpret.RIX(stats.rix)
    }
  };
}

/**
 * Find grade and age average
 * @param {object} interpretations Calculated and interpreted statistics
 * @returns {object}
 */
function consensus(interpretations) {
  if (
    typeof interpretations != "object" ||
    Object.keys(interpretations).length < 1
  ) {
    throw new TypeError(
      "Parameter 'interpretations' must be a non-empty object"
    );
  }
  return {
    grade: utilities.average([
      interpretations.automatedReadability.grade,
      interpretations.fleschKincaid.grade,
      interpretations.colemanLiau.grade,
      interpretations.smog.grade,
      interpretations.rix.grade
    ]),
    age: utilities.average([
      interpretations.automatedReadability.age,
      interpretations.fleschKincaid.age,
      interpretations.colemanLiau.age,
      interpretations.smog.age
    ])
  };
}

module.exports = {
  setup: setup,
  count: count,
  statistics: statistics,
  interpretations: interpretations,
  consensus: consensus
};
