# Readability Formulas

The following is an overview and specification of each readability test applied. The following rules apply to all tests:

1. Must be applicable to all languages, or transferable between languages through generic adaption
2. Must be documented in piece of academic research
  - Preferably available online
3. Must have a reasonably performant implementation

## Tests

### Automated Readability Index

Applicability — Modified by a localized grade modifier.
[Implementation](https://github.com/words/automated-readability) — Basic formula: Sentences, words, characters.
[Explanation](https://en.wikipedia.org/wiki/Automated_readability_index) — Yields an approximate representation of the grade level needed to comprehend the text.
[Source](https://apps.dtic.mil/dtic/tr/fulltext/u2/667273.pdf) —  Senter, R.J.; Smith, E.A. (November 1967). "Automated Readability Index". Wright-Patterson Air Force Base: iii. AMRL-TR-6620.

### Flesch Reading Ease

[Applicability](https://github.com/Yoast/YoastSEO.js/issues/267) — Adapted to various languages.
[Implementation](./src/computors.js) — Basic formula: Average length of sentences, syllables in words.
[Explanation](https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests#Flesch_Reading_Ease) — Yields a number between 0 and 100, corresponding to a graded difficulty -- 0 being easiest, 100 hardest.
[Source](https://doi.org/10.1037%2Fh0057532) — Flesch, R. (1948). "A new readability yardstick". Journal of Applied Psychology. 32 (3): 221–233.

### Flesch-Kincaid Grade-level

Applicability — Modified by a localized grade modifier.
[Implementation](https://github.com/words/automated-readability) — Basic formula: Average length of sentences, syllables in words.
[Explanation](https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests#Flesch%E2%80%93Kincaid_grade_level) — Transforms Flesch Reading Ease into grade level.
Source — Kincaid, J.P., Fishburne, R.P., Rogers, R.L., & Chissom, B.S. (1975). Derivation of new readability formulas (automated readability index, fog count, and flesch reading ease formula) for Navy enlisted personnel. Research Branch Report 8–75. Chief of Naval Technical Training: Naval Air Station Memphis.

### Coleman-Liau Grade-level

Applicability — Modified by a localized grade modifier.
[Implementation](https://github.com/words/coleman-liau) — Basic formula: Average number of sentences, words, letters.
[Explanation](https://en.wikipedia.org/wiki/Flesch%E2%80%93Kincaid_readability_tests#Flesch_Reading_Ease) — Yields an approximate representation of the grade level needed to comprehend the text.
Source — Coleman, Meri; and Liau, T. L. (1975); A computer readability formula designed for machine scoring, Journal of Applied Psychology, Vol. 60, pp. 283–284.

### Simple Measure of Gobbledygook

Applicability — Modified by a localized grade modifier.
[Implementation](https://github.com/words/smog-formula) — Basic formula: Amount of sentences, polysyllabic words.
[Explanation](https://en.wikipedia.org/wiki/SMOG) — Yields an approximate estimation of the years of education needed to understand a piece of writing.
[Source](https://ogg.osu.edu/media/documents/health_lit/WRRSMOG_Readability_Formula_G._Harry_McLaughlin__1969_.pdf) — McLaughlin, G. Harry (May 1969). "SMOG Grading — a New Readability Formula". Journal of Reading. 12 (8): 639–646.

### Lesbarhetsindex

Applicability — Generally relevant.
[Implementation](./src/computors.js) — Basic formula: Total words, number of sentences, number of long words (more than 6 characters).
[Explanation](https://readable.com/blog/how-can-lix-and-rix-help-score-readability-for-non-english-content/) — Yields an approximate estimation of the years of education needed to understand a piece of writing.
Source — Björnsson, C. H. (1968). Läsbarhet. Stockholm: Liber.

### Anderson's Readability Index

Applicability — Generally relevant.
[Implementation](./src/computors.js) — Basic formula: Total number of sentences, number of long words (more than 6 characters).
[Explanation](https://readable.com/blog/how-can-lix-and-rix-help-score-readability-for-non-english-content/) — Transforms Lesbarhetsindex into grade level.
[Source](https://www.jstor.org/stable/40031755) — Anderson, J. (1983). Lix and Rix: Variations on a little-known readability index. Journal of Reading, 26(6), 490–496.

## Highlighting

### Paragraphs

When highlighting paragraphs, the method is plainly iteration through and wrapping each detected paragraph in `p`-tags to preserve whitespaces and line-breaks.

### Sentences

[Implementation](./src/highlighter.js) — Iteration, basic filtering: Amount of words per sentence.
Explanation — Sentences shorter than 20 words are regarded as normal; more than 20 but less than or equal to 25 are fairly difficult; more than 25 but less than or equal to 30 are difficult; more than 30 but less than or equal to 40 are very difficult; more than 40 are extremely difficult.
[Source](https://support.siteimprove.com/hc/en-gb/articles/114094113972-Readability-Why-are-long-sentences-over-20-words-) — Gústafsdóttir, Guðrún (2019). "Readability: Why are long sentences over 20 words?".

### Words

[Implementation](./src/highlighter.js) — Iteration, implements hyphenation: Amount of syllables per word.
Explanation — Words with 1 syllable are regarded as easy; 2 syllables as normal; 3 syllables as difficult; 4 syllables as very difficult; 5 or more syllables as extremely difficult.
[Source](https://support.siteimprove.com/hc/en-gb/articles/114094113952-Readability-What-are-complex-words-and-how-are-they-determined-) — Gústafsdóttir, Guðrún (2017). "Readability: What are complex words and how are they determined?".
