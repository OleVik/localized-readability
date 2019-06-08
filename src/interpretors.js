/**
 * Interpret readability statistics
 * @module Interpretors
 */

/**
 * Translate Flesch-score to description
 * @param {number} x Flesch-score
 * @param {object} annotate Localized annotation
 * @returns {string} Difficulty of reading text
 */
function Flesch(x, annotate) {
  if (typeof x != "number" || x < 1) {
    throw new TypeError("Parameter 'x' must be a number >= 1");
  }
  if (typeof annotate != "object" || Object.keys(annotate).length < 1) {
    throw new TypeError("Parameter 'annotate' must be a non-empty object");
  }
  var level;
  if (x <= 30) {
    level = annotate.stats.flesch.levels["0"];
  } else if (x > 30 && x <= 50) {
    level = annotate.stats.flesch.levels["1"];
  } else if (x > 50 && x <= 60) {
    level = annotate.stats.flesch.levels["2"];
  } else if (x > 60 && x <= 70) {
    level = annotate.stats.flesch.levels["3"];
  } else if (x > 70 && x <= 80) {
    level = annotate.stats.flesch.levels["4"];
  } else if (x > 80 && x <= 90) {
    level = annotate.stats.flesch.levels["5"];
  } else if (x > 90) {
    level = annotate.stats.flesch.levels["6"];
  }
  return `${level} ${annotate.stats.flesch.descriptor}.`;
}

/**
 * Interpret SMOG-score
 * @param {number} x SMOG-score
 * @param {number} words Total amount of words
 * @param {number} gradeModifier Amount of years to add to score, localized
 * @returns {number} Years of education needed to understand text
 * @see {@link https://en.wikipedia.org/wiki/Educational_stage|WikiPedia.org/wiki/Educational_stage}
 */
function SMOG(x, words, gradeModifier = 0) {
  if (typeof x != "number") {
    throw new TypeError("Parameter 'x' must be a number");
  }
  if (typeof words != "number" || words < 1) {
    throw new TypeError("Parameter 'words' must be a number >= 1");
  }
  if (words < 30) {
    return false;
  }
  return x + gradeModifier;
}

/**
 * Translate LIX-score to description
 * @param {number} x LIX-score
 * @param {object} annotate Localized annotation
 * @returns {string} Difficulty of reading text
 */
function LIX(x, annotate) {
  if (typeof x != "number" || x < 1) {
    throw new TypeError("Parameter 'x' must be a number >= 1");
  }
  if (typeof annotate != "object" || Object.keys(annotate).length < 1) {
    throw new TypeError("Parameter 'annotate' must be a non-empty object");
  }
  if (x == Infinity) {
    return NaN;
  } else if (x < 20) {
    return `${annotate.stats.lix.levels["4"]}.`;
  } else if (x >= 20 && x < 30) {
    return `${annotate.stats.lix.levels["3"]}.`;
  } else if (x >= 30 && x < 40) {
    return `${annotate.stats.lix.levels["2"]}.`;
  } else if (x >= 40 && x < 50) {
    return `${annotate.stats.lix.levels["1"]}.`;
  } else if (x >= 50) {
    return `${annotate.stats.lix.levels["0"]}.`;
  }
}

/**
 * Translate RIX-score to description
 * @param {number} x RIX-score
 * @returns {number} Years of education needed to understand text
 */
function RIX(x) {
  if (typeof x != "number" || x < 1) {
    throw new TypeError("Parameter 'x' must be a number >= 1");
  }
  if (x == Infinity) {
    return NaN;
  } else if (x < 0.2) {
    return 1;
  } else if (x >= 0.2 && x < 0.5) {
    return 2;
  } else if (x >= 0.5 && x < 0.8) {
    return 3;
  } else if (x >= 0.8 && x < 1.3) {
    return 4;
  } else if (x >= 1.3 && x < 1.8) {
    return 5;
  } else if (x >= 1.8 && x < 2.4) {
    return 6;
  } else if (x >= 2.4 && x < 3.0) {
    return 7;
  } else if (x >= 3.0 && x < 3.7) {
    return 8;
  } else if (x >= 3.7 && x < 4.5) {
    return 9;
  } else if (x >= 4.5 && x < 5.3) {
    return 10;
  } else if (x >= 5.3 && x < 6.2) {
    return 11;
  } else if (x >= 6.2 && x < 7.2) {
    return 12;
  } else if (x >= 7.2) {
    return 13;
  }
}

module.exports = {
  Flesch,
  SMOG,
  LIX,
  RIX
};
