# Localized Readability

Generate readability-statistics with localized options.

## Table of Contents

- [Background](#background)
- [Contributing](#contributing)
- [Install](#install)
- [Usage](#usage)
- [Building](#building)
- [License](#license)

## Background

Most readability statistics are inherently specific to English text and US Grade Levels. This package tries to rectify
that with localized variations where applicable, whilst still delivering a ready-to-use module for generating applicable
statistics to any language and input.

See [FORMULAS.md](FORMULAS.md) for an overview and specification of readability formulas applied.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md), [Pull Requests](https://github.com/OleVik/localized-readability/pulls) are very
welcome.

Please post ideas, requests for features, improvements, research, and the like as
[Issues](https://github.com/OleVik/localized-readability/issues).

### Adding languages

To add a new language, simply make a copy of /annotations/language.en-us.js, and replace "en-us" in the filename with
the appropriate language-code corresponding to a [hyphenation
pattern](https://github.com/fluid-project/hyphenation-patterns/tree/master/patterns). Then edit each string to fit your
chosen language. Please submit the new file in a Pull Request so others might benefit as well.

#### Adapting specific readability formulas

Some formulas have specific implementations for specific languages. If you aware of research delineating how to
implement this, please share it as described above. If none can be found, the generic or English version will be used.

## Install

Using Node.JS' Package Manager:

```bash
npm install --save localized-readability
```

In the browser:

```html
<script src="//unpkg.com/localized-readability@latest/dist/localized-readability.min.js"></script>
```

### Including assets in the browser

Before including the module itself:

```html
<script src="//unpkg.com/localized-readability@latest/dist/hypher.js"></script>
<script src="//unpkg.com/localized-readability@latest/dist/patterns/en-us.js"></script>
<script src="//unpkg.com/localized-readability@latest/dist/annotations/language.en-us.js"></script>
```

To get an idea of what it does, see the [interactive demo](https://olevik.github.io/localized-readability/) and [it's source](https://github.com/OleVik/localized-readability/tree/master/docs) for a sample implementation in the browser.

## Usage

The module exports a `Parser` and a `Highlighter`. To generate statistics, pass a plain text string, an instance of Hypher, and applicable hyphenation patterns to `Parser.setup()`. Further, pass the results to `Parser.count()` to get descriptive statistics, the result of that to `Parser.statistics()` as well as a language-string to get readability statistics. The result of that to `Parser.interpretations()` as well as annotations to get interpreted readability statistics, and finally the result of that to `Parser.consensus()` to get an aggregated score on age and grade.

The language-string corresponds to the [patterns defined by the Fluid
Project](https://github.com/fluid-project/hyphenation-patterns/tree/master/patterns), specifically the name of the file
without the extension. Annotations follow the same pattern, a simple string of text representing the language-file.

For example:

```js
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

```js
const Highlighter = require("localized-readability").highlighter;
const nlcst = message.setup.nlcst;

const highlight = Highlighter.highlight(nlcst, {
  paragraphs: true,
  sentences: true,
  words: true,
  Hypher: Hypher,
  HyphenationPatterns: HyphenationPatterns,
});

console.log(highlight);
```

This returns a string of highlighted text, wherein the `p`-tag is used for paragraphs, and the `mark`-tag is used for sentences and words. The class `sentence` denotes sentences, and `word` words, as well as the class and a number between 0 and 4 — higher numbers indicating higher difficulty. For example, `<mark class="sentence sentence-0"><mark class="word word-0">Hi</mark>!</mark>`.

#### Performance

It is advised not to run the Highlighter synchronously in a browser, and to consider offsetting each type of highlighting if possible. The paragraph- and sentence-highlighting is much simpler in this regard, and can fairly safely be ran together on medium-length inputs. Word-highlighting is much more resource intensive, as each word has to have its syllables counted, and can take several seconds even on short-length inputs.

In the [/test/browser folder](https://github.com/OleVik/localized-readability/tree/master/test/browser) there are an html-files which demonstrate running the Parser and Highlighter asynchronously, for various languages. The [interactive demo](https://olevik.github.io/localized-readability/) does the same, but with added controls.

## Development

Install dependencies:

`npm install`

Build module:

`npm run build`

### Test data

Test-data comes from [Farkas
Translations](https://web.archive.org/web/20180120112908/http://www.farkastranslations.com/books/Doyle_Arthur_Conan-Hound_of_the_Baskervilles-en-fr-es-hu-fi-no.html) and [Bilinguis.com](http://bilinguis.com/book/baskerville/), see sources listed there.

## License

[MIT](LICENSE) by 2019-2024 Ole Vik, NTNU

## Under consideration

- [ ] Consider whether easy and difficult words hold merit in determining difficulty
  - Used in Gunning Fog
- [ ] Possible alternatives for language-specific word lists:
  - LITMUS-CLT (17 languages) https://www.tandfonline.com/doi/full/10.1080/02699206.2017.1308553
  - https://glottobank.org/
  - Norwegian: http://tekstlab.uio.no/ordforradet/nb/word_tests
- [ ] Determine Syllable Modifier: Languages vary in this regard
  - Potentially https://wals.info/chapter/12
- [ ] Determine Sentence Length Modifier: Compound-words are more common in some languages
- [ ] Evaluate performance of https://github.com/ytiurin/hyphen vs Hypher
