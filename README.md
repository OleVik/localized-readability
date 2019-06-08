# Localized Readability

Generate readability-statistics with localized options.

## Table of Contents

- [Background](#background)
- [Contributing](#contributing)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Building](#building)
- [License](#license)

## Background

Most readability statistics are inherently specific to English text and US Grade Levels. This package tries to rectify that with localized variations where applicable, whilst still delivering a ready-to-use module for generating applicable statistics to any language and input.

See [FORMULAS.md](FORMULAS.md) for an overview and specification of readability formulas applied.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md), Pull Requests are very welcome.

Please post ideas, requests for features, improvements, research, and the like as Issues. 

### Adding languages

To add a new language, simply make a copy of /annotations/language.en-us.js, and replace "en-us" in the filename with the appropriate language-code corresponding to a [hyphenation pattern](https://github.com/fluid-project/hyphenation-patterns/tree/master/patterns). Then edit each string to fit your chosen language. Please submit the new file in a Pull Request so others might benefit as well.

#### Adapting specific readability formulas

Some formulas have specific implementations for specific languages. If you aware of research delineating how to implement this, please share it as described above. If none can be found, the generic or English version will be used.

## Install

Using Node.JS' Package Manager:

```
npm install —save localized-readability
```

In the browser:

```
<script src="//unpkg.com/localized-readability@latest/dist/localized-readability.min.js"></script>
```

### Including assets in the browser

Before including the module itself:

```
<script src="//unpkg.com/localized-readability@latest/dist/hypher.js"></script>
<script src="//unpkg.com/localized-readability@latest/dist/patterns/en-us.js"></script>
<script src="//unpkg.com/localized-readability@latest/dist/annotations/language.en-us.js"></script>
```

## Usage

The module exports a `Parser` and a `Highlighter`. To generate statistics, pass a plain text string, an instance of Hypher, and applicable hyphenation patterns to `Parser.setup()`. Further, pass the results to `Parser.count()` to get descriptive statistics, the result of that to `Parser.statistics()` as well as a language-string to get readability statistics, the result of that to `Parser.interpretations()` as well as annotations to get interpreted readability statistics, and finally the result of that to `Parser.consensus()` to get an aggregated score on age and grade.

The language-string corresponds to the [patterns defined by the Fluid Project](https://github.com/fluid-project/hyphenation-patterns/tree/master/patterns), specifically the name of the file without the extension. Annotations follow the same pattern, a simple string of text representing the language-file.

For example:

```
const Parser = require("localized-readability").parser;

const message = {};
message.setup = Parser.setup(data.input, Hypher, HyphenationPatterns);
message.count = Parser.count(message.setup);
message.statistics = Parser.statistics(message.count, data.lang);
message.interpretations = Parser.interpretations(
  message.statistics,
  Annotations
);
message.consensus = Parser.consensus(message.interpretations);

console.log(message);
```

### Highlighting data

The `Highlighter` takes a Natural Language Concrete Syntax Tree, given by `Parser.setup()` as the `nlcst`-property, through the `Highlighter.highlight()`-function and formats it with optional paragraphs, highlighted sentences, and highlighted words. The second parameter is an object of options, wherein `words: true` also requires an instance of Hypher and hyphenation patterns, as shown below:

```
const Highlighter = require("localized-readability").highlighter;
const nlcst = message.setup.nlcst;

const highlight = Highlighter.highlight(nlcst, {
  paragraphs: true,
  sentences: true,
  words: true,
  Hypher: Hypher,
  HyphenationPatterns: HyphenationPatterns
});

console.log(highlight);
```

This returns a string of highlighted text, wherein the `p`-tag is used for paragraphs, and the `mark`-tag is used for sentences and words. The class `sentence` denotes sentences, and `word` words, as well as the class and a number between 0 and 4 — higher numbers indicating higher difficulty. For example, `<mark class="sentence sentence-0"><mark class="word word-0">Hi</mark>!</mark>`.

#### Performance

It is advised not to run the Highlighter synchronously in a browser, and to consider offsetting each type of highlighting if possible. The paragraph- and sentence-highlighting is much simpler in this regard, and can fairly safely be ran together on medium-length inputs. Word-highlighting is much more resource intensive, as each word has to have its syllables counted, and can take several seconds even on short-length inputs.

In the [test/browser folder](https://github.com/OleVik/localized-readability/tree/master/test/browser) there are an html-files which demonstrates running the Parser and Highlighter asynchronously, for various languages.

## API

<a name="module_Computors"></a>

### Computors
Compute readability statistics


* [Computors](#module_Computors)
    * [~LIX(count)](#module_Computors..LIX) ⇒ <code>number</code>
    * [~RIX(count)](#module_Computors..RIX) ⇒ <code>number</code>
    * [~Flesch(count, lang)](#module_Computors..Flesch) ⇒ <code>number</code>

<a name="module_Computors..LIX"></a>

#### Computors~LIX(count) ⇒ <code>number</code>
Calculate LIX-score

**Kind**: inner method of [<code>Computors</code>](#module_Computors)  
**See**: [Readable.com: "How can Lix and Rix help score readability for non-English content?"](https://readable.com/blog/how-can-lix-and-rix-help-score-readability-for-non-english-content/)  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>object</code> | Count of total words, periods, long words |

<a name="module_Computors..RIX"></a>

#### Computors~RIX(count) ⇒ <code>number</code>
Calculate RIX-score

**Kind**: inner method of [<code>Computors</code>](#module_Computors)  
**See**: [Readable.com: "How can Lix and Rix help score readability for non-English content?""](https://readable.com/blog/how-can-lix-and-rix-help-score-readability-for-non-english-content/)  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>object</code> | Count of total sentences, long words |

<a name="module_Computors..Flesch"></a>

#### Computors~Flesch(count, lang) ⇒ <code>number</code>
Calculate Flesch-score, multilingual-implementation

**Kind**: inner method of [<code>Computors</code>](#module_Computors)  
**See**

- [GitHub.com/Yoast/YoastSEO.js#267: "Flesch reading ease test l10n"](https://github.com/Yoast/YoastSEO.js/issues/267)
- [GitHub.com/hdaSprachtechnologie/easy-to-understand_language: calculate_flesch.py](https://github.com/hdaSprachtechnologie/easy-to-understand_language/blob/master/calculate_flesch.py#L87-L115)


| Param | Type | Description |
| --- | --- | --- |
| count | <code>object</code> | Count of total sentences, words, syllables |
| lang | <code>string</code> | Language identifier |

<a name="module_Highlighter"></a>

### Highlighter
Highlight difficulty with HTML


* [Highlighter](#module_Highlighter)
    * [~highlight(tree, options)](#module_Highlighter..highlight) ⇒ <code>object</code>
    * [~stringify(tree)](#module_Highlighter..stringify) ⇒ <code>string</code>

<a name="module_Highlighter..highlight"></a>

#### Highlighter~highlight(tree, options) ⇒ <code>object</code>
Grade and highlight paragrahs, sentences, and words in a Natural Language Concrete Syntax Tree

**Kind**: inner method of [<code>Highlighter</code>](#module_Highlighter)  
**Returns**: <code>object</code> - NLCST syntax tree  
**See**: [SiteImprove.com: "Readability: Why are long sentences over 20 words?"](https://support.siteimprove.com/hc/en-gb/articles/114094113972)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| tree | <code>object</code> |  | NLCST syntax tree |
| options | <code>object</code> | <code>false</code> | Options |
| options.paragraphs | <code>boolean</code> |  | Wrap ParagraphNodes in p-tags |
| options.sentences | <code>boolean</code> |  | Wrap SentenceNodes in mark-tags |
| options.words | <code>boolean</code> |  | Wrap WordNodes in mark-tags |
| options.Hypher | <code>object</code> |  | Hypher instance |
| options.HyphenationPatterns | <code>object</code> |  | Hyphenations patterns |

<a name="module_Highlighter..stringify"></a>

#### Highlighter~stringify(tree) ⇒ <code>string</code>
Stringify a Natural Language Concrete Syntax Tree

**Kind**: inner method of [<code>Highlighter</code>](#module_Highlighter)  
**Returns**: <code>string</code> - Plain text  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>object</code> | NLCST syntax tree |

<a name="module_Interpretors"></a>

### Interpretors
Interpret readability statistics


* [Interpretors](#module_Interpretors)
    * [~Flesch(x, annotate)](#module_Interpretors..Flesch) ⇒ <code>string</code>
    * [~SMOG(x, words, gradeModifier)](#module_Interpretors..SMOG) ⇒ <code>number</code>
    * [~LIX(x, annotate)](#module_Interpretors..LIX) ⇒ <code>string</code>
    * [~RIX(x)](#module_Interpretors..RIX) ⇒ <code>number</code>

<a name="module_Interpretors..Flesch"></a>

#### Interpretors~Flesch(x, annotate) ⇒ <code>string</code>
Translate Flesch-score to description

**Kind**: inner method of [<code>Interpretors</code>](#module_Interpretors)  
**Returns**: <code>string</code> - Difficulty of reading text  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | Flesch-score |
| annotate | <code>object</code> | Localized annotation |

<a name="module_Interpretors..SMOG"></a>

#### Interpretors~SMOG(x, words, gradeModifier) ⇒ <code>number</code>
Interpret SMOG-score

**Kind**: inner method of [<code>Interpretors</code>](#module_Interpretors)  
**Returns**: <code>number</code> - Years of education needed to understand text  
**See**: [WikiPedia.org/wiki/Educational_stage](https://en.wikipedia.org/wiki/Educational_stage)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> |  | SMOG-score |
| words | <code>number</code> |  | Total amount of words |
| gradeModifier | <code>number</code> | <code>0</code> | Amount of years to add to score, localized |

<a name="module_Interpretors..LIX"></a>

#### Interpretors~LIX(x, annotate) ⇒ <code>string</code>
Translate LIX-score to description

**Kind**: inner method of [<code>Interpretors</code>](#module_Interpretors)  
**Returns**: <code>string</code> - Difficulty of reading text  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | LIX-score |
| annotate | <code>object</code> | Localized annotation |

<a name="module_Interpretors..RIX"></a>

#### Interpretors~RIX(x) ⇒ <code>number</code>
Translate RIX-score to description

**Kind**: inner method of [<code>Interpretors</code>](#module_Interpretors)  
**Returns**: <code>number</code> - Years of education needed to understand text  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | RIX-score |

<a name="module_Parser"></a>

### Parser
Parse data for use in generating readability statistics


* [Parser](#module_Parser)
    * [~setup(input, Hypher, patterns)](#module_Parser..setup) ⇒ <code>object</code>
    * [~count(data)](#module_Parser..count) ⇒ <code>object</code>
    * [~statistics(count, lang)](#module_Parser..statistics) ⇒ <code>object</code>
    * [~interpretations(count, stats, annotations)](#module_Parser..interpretations) ⇒ <code>object</code>
    * [~consensus(interpretations)](#module_Parser..consensus) ⇒ <code>object</code>

<a name="module_Parser..setup"></a>

#### Parser~setup(input, Hypher, patterns) ⇒ <code>object</code>
Setup options and parse

**Kind**: inner method of [<code>Parser</code>](#module_Parser)  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | String to parse |
| Hypher | <code>object</code> | Hypher instance |
| patterns | <code>object</code> | Hyphenations patterns |

<a name="module_Parser..count"></a>

#### Parser~count(data) ⇒ <code>object</code>
Count various descriptives in text

**Kind**: inner method of [<code>Parser</code>](#module_Parser)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Static data from parsing |

<a name="module_Parser..statistics"></a>

#### Parser~statistics(count, lang) ⇒ <code>object</code>
Calculate readability statistics from text

**Kind**: inner method of [<code>Parser</code>](#module_Parser)  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>object</code> | Descriptive data from text |
| lang | <code>string</code> | Language to use |

<a name="module_Parser..interpretations"></a>

#### Parser~interpretations(count, stats, annotations) ⇒ <code>object</code>
Calculate and interpret statistics

**Kind**: inner method of [<code>Parser</code>](#module_Parser)  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>object</code> | Descriptive statistics |
| stats | <code>object</code> | Calculated statistics |
| annotations | <code>object</code> | Localized annotations |

<a name="module_Parser..consensus"></a>

#### Parser~consensus(interpretations) ⇒ <code>object</code>
Find grade and age average

**Kind**: inner method of [<code>Parser</code>](#module_Parser)  

| Param | Type | Description |
| --- | --- | --- |
| interpretations | <code>object</code> | Calculated and interpreted statistics |

<a name="module_Utilities"></a>

### Utilities
Helpers for counting and calculating


* [Utilities](#module_Utilities)
    * [~countSyllables(TextNodes, Hypher, patterns)](#module_Utilities..countSyllables) ⇒ <code>Object</code>
    * [~countPeriods(str)](#module_Utilities..countPeriods) ⇒ <code>number</code>
    * [~average(data)](#module_Utilities..average) ⇒ <code>number</code>

<a name="module_Utilities..countSyllables"></a>

#### Utilities~countSyllables(TextNodes, Hypher, patterns) ⇒ <code>Object</code>
Count syllables and polysillabic words in a Natural Language Concrete Syntax Tree

**Kind**: inner method of [<code>Utilities</code>](#module_Utilities)  

| Param | Type | Description |
| --- | --- | --- |
| TextNodes | <code>object</code> | Array of text nodes |
| Hypher | <code>object</code> | Hypher instance |
| patterns | <code>object</code> | Hyphenations patterns |

<a name="module_Utilities..countPeriods"></a>

#### Utilities~countPeriods(str) ⇒ <code>number</code>
Count total periods (dots, colons, capital letters) in a string

**Kind**: inner method of [<code>Utilities</code>](#module_Utilities)  
**Returns**: <code>number</code> - Aggregated count  
**See**: [GitHub.com/agareis/coding-journey: readability.js](https://github.com/agareis/coding-journey/blob/master/lix-demo-node/readability.js)  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | Input-string |

<a name="module_Utilities..average"></a>

#### Utilities~average(data) ⇒ <code>number</code>
Calculate average sum

**Kind**: inner method of [<code>Utilities</code>](#module_Utilities)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>array</code> | Array of numbers |

### Test data

All test-data comes from [Farkas Translations](https://web.archive.org/web/20180120112908/http://www.farkastranslations.com/books/Doyle_Arthur_Conan-Hound_of_the_Baskervilles-en-fr-es-hu-fi-no.html), see sources listed there.

## License

[MIT](LICENSE) by 2019 Ole Vik, NTNU

## Todo

- Consider whether easy and difficult words hold merit in determining difficulty
  - Used in Gunning Fog
  - Possible alternatives for language-specific word lists:
    - LITMUS-CLT (17 languages) https://www.tandfonline.com/doi/full/10.1080/02699206.2017.1308553
    - https://glottobank.org/
    - Norwegian: http://tekstlab.uio.no/ordforradet/nb/word_tests
- Determine Syllable Modifier: Languages vary in this regard
  - Potentially https://wals.info/chapter/12
- Determine Sentence Length Modifier: Compound-words are more common in some languages
- Evaluate performance of https://github.com/ytiurin/hyphen vs Hypher