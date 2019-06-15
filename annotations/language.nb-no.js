module.exports = {
  general: {
    module: "Lesbarhet",
    score: "Resultat",
    interpretations: "Tolkninger",
    counts: "Antall",
    age: "Alder",
    grade: "Klassetrinn",
    paragraphs: "Avsnitt",
    sentences: "Setninger",
    words: "Ord",
    syllables: "Stavelser",
    polysillabicWords: "Flerstavelsesord",
    letters: "Bokstaver",
    characters: "Tegn",
    longwords: "Lange ord",
    periods: "Punktum",
    punctuations: "Tegnsettingstegn",
    whitespaces: "Mellomrom"
  },
  modifier: {
    grade: {
      constant: 6,
      source: "https://en.wikipedia.org/wiki/Educational_stage#Norway"
    },
    syllable: {
      constant: 1,
      source: ""
    }
  },
  highlight: {
    "0": "Normal",
    "1": "Ganske vanskelig",
    "2": "Vanskelig",
    "3": "Svært vanskelig",
    "4": "Ekstremt vanskelig"
  },
  stats: {
    consensus: {
      description: "Gjennomsnitt av mål."
    },
    automatedReadability: {
      title: "Automated Readability Index",
      description:
        "Beregner klassetrinn, ved bruk av mengde setninger, ord og bokstaver."
    },
    flesch: {
      title: "Flesch Reading Ease",
      description:
        "Måler kompleksiteten i teksten, ved bruk av gjennomsnittlig lengde på setninger og stavelser i ord.",
      levels: {
        "0": "Svært vanskelig",
        "1": "Vanskelig",
        "2": "Ganske vanskelig",
        "3": "Klartekst",
        "4": "Ganske lett",
        "5": "Lett",
        "6": "Svært lett"
      },
      descriptor: "å lese"
    },
    fleschKincaid: {
      title: "Flesch-Kincaid Grade-level",
      description: "Oversetter Flesch-poengsum til klassetrinn."
    },
    colemanLiau: {
      title: "Coleman-Liau Grade-level",
      description:
        "Beregner klassetrinn, ved bruk av gjennomsnittlig mengde setninger, ord og bokstaver."
    },
    smog: {
      title: "Simple Measure of Gobbledygook",
      description:
        "Et 'Enkelt Mål for Vås', som måler antall år med utdanning nødvendig for å forstå teksten, ved bruk av mengde setninger og flerstavelsesord."
    },
    lix: {
      title: "Lesbarhetsindex",
      description:
        "Lettlesthet basert på totalt antall ord, antall setninger og antall lange ord (mer enn seks bokstaver).",
      levels: {
        "0": "Svært vanskelig",
        "1": "Vanskelig",
        "2": "Gjennomsnittlig",
        "3": "Lett",
        "4": "Svært lett"
      }
    },
    rix: {
      title: "Anderson's Readability Index",
      description:
        "Oversetter LIX til klassetrinn, ved bruk av antall setninger og lange ord."
    }
  }
};
