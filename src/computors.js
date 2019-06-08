/**
 * Compute readability statistics
 * @module Computors
 */

/**
 * Calculate LIX-score
 * @param {object} count Count of total words, periods, long words
 * @returns {number}
 * @see {@link https://readable.com/blog/how-can-lix-and-rix-help-score-readability-for-non-english-content/|Readable.com: "How can Lix and Rix help score readability for non-English content?"}
 */
function LIX(count) {
  if (!count || !count.words || !count.periods || !count.longwords) {
    return NaN;
  }
  return count.words / count.periods + (count.longwords * 100) / count.words;
}

/**
 * Calculate RIX-score
 * @param {object} count Count of total sentences, long words
 * @returns {number}
 * @see {@link https://readable.com/blog/how-can-lix-and-rix-help-score-readability-for-non-english-content/|Readable.com: "How can Lix and Rix help score readability for non-English content?""}
 */
function RIX(count) {
  if (!count || !count.sentences || !count.longwords) {
    return NaN;
  }
  return count.longwords / count.sentences;
}

/**
 * Calculate Flesch-score, multilingual-implementation
 * @param {object} count Count of total sentences, words, syllables
 * @param {string} lang Language identifier
 * @returns {number}
 * @see {@link https://github.com/Yoast/YoastSEO.js/issues/267|GitHub.com/Yoast/YoastSEO.js#267: "Flesch reading ease test l10n"}
 * @see {@link https://github.com/hdaSprachtechnologie/easy-to-understand_language/blob/master/calculate_flesch.py#L87-L115|GitHub.com/hdaSprachtechnologie/easy-to-understand_language: calculate_flesch.py}
 */
function Flesch(count, lang) {
  if (!count || !count.words || !count.sentences || !count.syllables) {
    return NaN;
  }
  const ASL = count.words / count.sentences;
  const ASW = count.syllables / count.words;
  switch (lang) {
    case "en-gb":
      return 206.835 - 1.015 * ASL - 84.6 * ASW;
    case "en-us":
      return 206.835 - 1.015 * ASL - 84.6 * ASW;
    case "de":
      return 180 - ASL - 58.5 * ASW;
    case "fr":
      return 207 - 1.015 * ASL - 73.6 * ASW;
    case "ru":
      return 206.835 - 1.3 * ASL - 60.1 * ASW;
    case "nb-no":
      return 180 - ASL - 58.5 * ASW;
  }
}

module.exports = {
  LIX,
  RIX,
  Flesch
};
