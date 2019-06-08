## Functions

<dl>
<dt><a href="#LIX">LIX(count)</a> ⇒ <code>number</code></dt>
<dd><p>Calculate LIX-score</p>
</dd>
<dt><a href="#RIX">RIX(count)</a> ⇒ <code>number</code></dt>
<dd><p>Calculate RIX-score</p>
</dd>
<dt><a href="#Flesch">Flesch(count, lang)</a> ⇒ <code>number</code></dt>
<dd><p>Calculate Flesch-score, multilingual-implementation</p>
</dd>
<dt><a href="#highlight">highlight(tree, options)</a> ⇒ <code>object</code></dt>
<dd><p>Grade and highlight paragrahs, sentences, and words in a Natural Language Concrete Syntax Tree</p>
</dd>
<dt><a href="#stringify">stringify(tree)</a> ⇒ <code>string</code></dt>
<dd><p>Stringify a Natural Language Concrete Syntax Tree</p>
</dd>
<dt><a href="#Flesch">Flesch(x, annotate)</a> ⇒ <code>string</code></dt>
<dd><p>Translate Flesch-score to description</p>
</dd>
<dt><a href="#SMOG">SMOG(x, words, gradeModifier)</a> ⇒ <code>number</code></dt>
<dd><p>Interpret SMOG-score</p>
</dd>
<dt><a href="#LIX">LIX(x, annotate)</a> ⇒ <code>string</code></dt>
<dd><p>Translate LIX-score to description</p>
</dd>
<dt><a href="#RIX">RIX(x)</a> ⇒ <code>number</code></dt>
<dd><p>Translate RIX-score to description</p>
</dd>
<dt><a href="#setup">setup(input, Hypher, patterns)</a> ⇒ <code>object</code></dt>
<dd><p>Setup options and parse</p>
</dd>
<dt><a href="#count">count(data)</a> ⇒ <code>object</code></dt>
<dd><p>Count various descriptives in text</p>
</dd>
<dt><a href="#statistics">statistics(count, lang)</a> ⇒ <code>object</code></dt>
<dd><p>Calculate readability statistics from text</p>
</dd>
<dt><a href="#interpretations">interpretations(count, stats, annotations)</a> ⇒ <code>object</code></dt>
<dd><p>Calculate and interpret statistics</p>
</dd>
<dt><a href="#consensus">consensus(interpretations)</a> ⇒ <code>object</code></dt>
<dd><p>Find grade and age average</p>
</dd>
<dt><a href="#countSyllables">countSyllables(TextNodes, Hypher, patterns)</a> ⇒ <code>Object</code></dt>
<dd><p>Count syllables and polysillabic words in a Natural Language Concrete Syntax Tree</p>
</dd>
<dt><a href="#countPeriods">countPeriods(str)</a> ⇒ <code>number</code></dt>
<dd><p>Count total periods (dots, colons, capital letters) in a string</p>
</dd>
<dt><a href="#average">average(data)</a> ⇒ <code>number</code></dt>
<dd><p>Calculate average sum</p>
</dd>
</dl>

<a name="LIX"></a>

## LIX(count) ⇒ <code>number</code>
Calculate LIX-score

**Kind**: global function  
**See**: https://readable.com/blog/how-can-lix-and-rix-help-score-readability-for-non-english-content/  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>object</code> | Count of total words, periods, long words |

<a name="RIX"></a>

## RIX(count) ⇒ <code>number</code>
Calculate RIX-score

**Kind**: global function  
**See**: https://readable.com/blog/how-can-lix-and-rix-help-score-readability-for-non-english-content/  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>object</code> | Count of total sentences, long words |

<a name="Flesch"></a>

## Flesch(count, lang) ⇒ <code>number</code>
Calculate Flesch-score, multilingual-implementation

**Kind**: global function  
**See**

- https://github.com/Yoast/YoastSEO.js/issues/267
- https://github.com/hdaSprachtechnologie/easy-to-understand_language/blob/master/calculate_flesch.py#L87-L115


| Param | Type | Description |
| --- | --- | --- |
| count | <code>object</code> | Count of total sentences, words, syllables |
| lang | <code>string</code> | Language identifier |

<a name="highlight"></a>

## highlight(tree, options) ⇒ <code>object</code>
Grade and highlight paragrahs, sentences, and words in a Natural Language Concrete Syntax Tree

**Kind**: global function  
**Returns**: <code>object</code> - NLCST syntax tree  
**See**: https://support.siteimprove.com/hc/en-gb/articles/114094113972  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| tree | <code>object</code> |  | NLCST syntax tree |
| options | <code>object</code> | <code>false</code> | Options |
| options.paragraphs | <code>boolean</code> |  | Wrap ParagraphNodes in <p> |
| options.sentences | <code>boolean</code> |  | Wrap SentenceNodes in <mark> |
| options.words | <code>boolean</code> |  | Wrap WordNodes in <mark> |
| options.Hypher | <code>object</code> |  | Hypher instance |
| options.HyphenationPatterns | <code>object</code> |  | Hyphenations patterns |

<a name="stringify"></a>

## stringify(tree) ⇒ <code>string</code>
Stringify a Natural Language Concrete Syntax Tree

**Kind**: global function  
**Returns**: <code>string</code> - Plain text  

| Param | Type | Description |
| --- | --- | --- |
| tree | <code>object</code> | NLCST syntax tree |

<a name="Flesch"></a>

## Flesch(x, annotate) ⇒ <code>string</code>
Translate Flesch-score to description

**Kind**: global function  
**Returns**: <code>string</code> - Difficulty of reading text  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | Flesch-score |
| annotate | <code>object</code> | Localized annotation |

<a name="SMOG"></a>

## SMOG(x, words, gradeModifier) ⇒ <code>number</code>
Interpret SMOG-score

**Kind**: global function  
**Returns**: <code>number</code> - Years of education needed to understand text  
**See**: https://en.wikipedia.org/wiki/Educational_stage  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> |  | SMOG-score |
| words | <code>number</code> |  | Total amount of words |
| gradeModifier | <code>number</code> | <code>0</code> | Amount of years to add to score, localized |

<a name="LIX"></a>

## LIX(x, annotate) ⇒ <code>string</code>
Translate LIX-score to description

**Kind**: global function  
**Returns**: <code>string</code> - Difficulty of reading text  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | LIX-score |
| annotate | <code>object</code> | Localized annotation |

<a name="RIX"></a>

## RIX(x) ⇒ <code>number</code>
Translate RIX-score to description

**Kind**: global function  
**Returns**: <code>number</code> - Years of education needed to understand text  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | RIX-score |

<a name="setup"></a>

## setup(input, Hypher, patterns) ⇒ <code>object</code>
Setup options and parse

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | String to parse |
| Hypher | <code>object</code> | Hypher instance |
| patterns | <code>object</code> | Hyphenations patterns |

<a name="count"></a>

## count(data) ⇒ <code>object</code>
Count various descriptives in text

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | Static data from parsing |

<a name="statistics"></a>

## statistics(count, lang) ⇒ <code>object</code>
Calculate readability statistics from text

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>object</code> | Descriptive data from text |
| lang | <code>string</code> | Language to use |

<a name="interpretations"></a>

## interpretations(count, stats, annotations) ⇒ <code>object</code>
Calculate and interpret statistics

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| count | <code>object</code> | Descriptive statistics |
| stats | <code>object</code> | Calculated statistics |
| annotations | <code>object</code> | Localized annotations |

<a name="consensus"></a>

## consensus(interpretations) ⇒ <code>object</code>
Find grade and age average

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| interpretations | <code>object</code> | Calculated and interpreted statistics |

<a name="countSyllables"></a>

## countSyllables(TextNodes, Hypher, patterns) ⇒ <code>Object</code>
Count syllables and polysillabic words in a Natural Language Concrete Syntax Tree

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| TextNodes | <code>object</code> | Array of text nodes |
| Hypher | <code>object</code> | Hypher instance |
| patterns | <code>object</code> | Hyphenations patterns |

<a name="countPeriods"></a>

## countPeriods(str) ⇒ <code>number</code>
Count total periods (dots, colons, capital letters) in a string

**Kind**: global function  
**Returns**: <code>number</code> - Aggregatd count  
**See**: https://github.com/agareis/coding-journey/blob/master/lix-demo-node/readability.js  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | Input-string |

<a name="average"></a>

## average(data) ⇒ <code>number</code>
Calculate average sum

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>array</code> | Array of numbers |

