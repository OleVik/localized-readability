/**
 * Helpers for counting and calculating
 * @module Utilities
 */

/**
 * Count syllables and polysillabic words in a Natural Language Concrete Syntax Tree
 * @param {object} TextNodes Array of text nodes
 * @param {object} Hypher Hypher instance
 * @param {object} patterns Hyphenations patterns
 * @returns {{syllables:Number, polysillabicWords:Number}}
 */
function countSyllables(TextNodes, Hypher, patterns) {
  if (typeof TextNodes != "object" || Object.keys(TextNodes).length < 1) {
    throw new TypeError("Parameter 'TextNodes' must be a non-empty object");
  }
  try {
    const hypher = new Hypher(patterns);
    var syllables = 0;
    var polysillabicWords = [];
    for (let i = 0; i < TextNodes.length; i++) {
      if (TextNodes[i].value.length >= 3) {
        const hyphens = hypher.hyphenate(TextNodes[i].value);
        if (hyphens.length >= 3) {
          polysillabicWords.push(TextNodes[i].value);
        }
        syllables += hyphens.length;
      }
    }
  } catch (error) {
    throw new Error(error);
  }
  return { syllables: syllables, polysillabicWords: polysillabicWords.length };
}

/**
 * Count total periods (dots, colons, capital letters) in a string
 * @param {string} str Input-string
 * @returns {number} Aggregated count
 * @see {@link https://github.com/agareis/coding-journey/blob/master/lix-demo-node/readability.js|GitHub.com/agareis/coding-journey: readability.js}
 */
function countPeriods(str) {
  if (typeof str != "string" || str.length < 1) {
    throw new TypeError("Parameter 'str' must be a non-empty string");
  }
  var dots = str.split(".").length - 1;
  var colons = str.split(":").length - 1;
  var capLetters = str.length - str.replace(/[A-Z]/g, "").length;
  return dots + colons + capLetters;
}

/**
 * Calculate average sum
 * @param {array} data Array of numbers
 * @returns {number}
 */
function average(data) {
  if (typeof data != "object" || Object.keys(data).length < 1) {
    throw new TypeError("Parameter 'data' must be a non-empty array");
  }
  var sum = 0;
  for (var i = 0; i < data.length; i++) {
    sum += parseInt(data[i], 10);
  }
  return sum / data.length;
}

module.exports = {
  countSyllables,
  countPeriods,
  average
};
