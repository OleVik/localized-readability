module.exports = {
  general: {
    module: "Readability",
    score: "Score",
    interpretations: "Interpretations",
    counts: "Counts",
    age: "Age",
    grade: "Grade",
    paragraphs: "Paragraphs",
    sentences: "Sentences",
    words: "Words",
    syllables: "Syllables",
    polysillabicWords: "Polysillabic words",
    letters: "Letters",
    characters: "Characters",
    longwords: "Long words",
    periods: "Periods",
    punctuations: "Punctuations",
    whitespaces: "Whitespaces"
  },
  modifier: {
    grade: {
      constant: 5,
      source: "https://en.wikipedia.org/wiki/Educational_stage#United_States"
    },
    syllable: {
      constant: 1,
      source: ""
    }
  },
  highlight: {
    "0": "Normal",
    "1": "Fairly difficult",
    "2": "Difficult",
    "3": "Very difficult",
    "4": "Extremely difficult"
  },
  stats: {
    consensus: {
      description: "Average across measurements."
    },
    automatedReadability: {
      title: "Automated Readability Index",
      description:
        "Approximates US grade level, using the amount of sentences, words, and letters."
    },
    flesch: {
      title: "Flesch Reading Ease",
      description:
        "Measures complexity of text, using the average length of sentences, and syllables in words.",
      levels: {
        "0": "Very difficult",
        "1": "Difficult",
        "2": "Fairly difficult",
        "3": "Plain English.",
        "4": "Fairly easy",
        "5": "Easy",
        "6": "Very easy"
      },
      descriptor: "to read"
    },
    fleschKincaid: {
      title: "Flesch-Kincaid Grade-level",
      description: "Translates Flesch-score into US grade level."
    },
    colemanLiau: {
      title: "Coleman-Liau Grade-level",
      description:
        "Approximates US grade level, using the average number of sentences, words, and letters."
    },
    smog: {
      title: "Simple Measure of Gobbledygook",
      description:
        "Measures the amount of years of education needed to understand the text, using the amount of sentences and polysyllabic words."
    },
    lix: {
      title: "Lesbarhetsindex",
      description:
        "Reading ease based on total words, number of sentences and number of long words (more than 6 characters).",
      levels: {
        "0": "Very difficult",
        "1": "Difficult",
        "2": "Average",
        "3": "Easy",
        "4": "Very easy"
      }
    },
    rix: {
      title: "Anderson's Readability Index",
      description:
        "Translates LIX into grade level, using the amount of sentences and long words."
    }
  }
};
