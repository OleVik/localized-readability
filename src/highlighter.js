/**
 * Highlight difficulty with HTML
 * @module Highlighter
 */

const map = require("unist-util-map");

/**
 * Grade and highlight paragrahs, sentences, and words in a Natural Language Concrete Syntax Tree
 * @param {object} tree NLCST syntax tree
 * @param {object} options Options
 * @param {boolean} options.paragraphs Wrap ParagraphNodes in p-tags
 * @param {boolean} options.sentences Wrap SentenceNodes in mark-tags
 * @param {boolean} options.words Wrap WordNodes in mark-tags
 * @param {object} options.Hypher Hypher instance
 * @param {object} options.HyphenationPatterns Hyphenations patterns
 * @returns {object} NLCST syntax tree
 * @see {@link https://support.siteimprove.com/hc/en-gb/articles/114094113972|SiteImprove.com: "Readability: Why are long sentences over 20 words?"}
 */
function highlight(tree, options = false) {
  if (typeof tree != "object" || Object.keys(tree).length < 1) {
    throw new TypeError("Parameter 'tree' must be a non-empty object");
  }
  if (options == false) {
    return tree;
  }
  const mutated = map(tree, function(node) {
    var difficulty = 0;
    if (options.words && node.type === "WordNode") {
      if (options.Hypher && options.HyphenationPatterns) {
        const utilities = require("./utilities");
        const syllableCount = utilities.countSyllables(
          node.children,
          options.Hypher,
          options.HyphenationPatterns
        ).syllables;
        if (syllableCount == 2) {
          difficulty = 1;
        } else if (syllableCount == 3) {
          difficulty = 2;
        } else if (syllableCount == 4) {
          difficulty = 3;
        } else if (syllableCount >= 5) {
          difficulty = 4;
        }
      }
      node.children.unshift({
        type: "TextNode",
        value: `<mark class="word word-${difficulty}">`
      });
      node.children.push({ type: "TextNode", value: "</mark>" });
    } else if (options.sentences && node.type === "SentenceNode") {
      const wordCount = node.children.filter(function(item) {
        return item.type == "WordNode";
      }).length;
      if (wordCount > 20 && wordCount <= 25) {
        difficulty = 1;
      } else if (wordCount > 25 && wordCount <= 30) {
        difficulty = 2;
      } else if (wordCount > 30 && wordCount <= 40) {
        difficulty = 3;
      } else if (wordCount > 40) {
        difficulty = 4;
      }
      node.children.unshift({
        type: "TextNode",
        value: `<mark class="sentence sentence-${difficulty}">`
      });
      node.children.push({ type: "TextNode", value: "</mark>" });
    } else if (options.paragraphs && node.type === "ParagraphNode") {
      node.children.unshift({ type: "TextNode", value: `<p>` });
      node.children.push({ type: "TextNode", value: "</p>" });
    }
    return node;
  });
  return mutated;
}

/**
 * Stringify a Natural Language Concrete Syntax Tree
 * @param {object} tree NLCST syntax tree
 * @returns {string} Plain text
 */
function stringify(tree) {
  if (typeof tree != "object" || Object.keys(tree).length < 1) {
    throw new TypeError("Parameter 'tree' must be a non-empty object");
  }
  const NLCSTtoString = require("nlcst-to-string");
  return NLCSTtoString(tree);
}

module.exports = {
  highlight,
  stringify
};
