/**
 * Convert milliseconds to human readable time
 * @param {number} millisec Float containing milliseconds
 * @see https://stackoverflow.com/a/32180863
 */
function msToTime(millisec) {
  var milliseconds = millisec.toFixed(2);
  var seconds = (millisec / 1000).toFixed(1);
  var minutes = (millisec / (1000 * 60)).toFixed(1);
  var hours = (millisec / (1000 * 60 * 60)).toFixed(1);
  var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);
  if (seconds <= 0) {
    return milliseconds + " ms";
  } else if (seconds < 60) {
    return seconds + " sec";
  } else if (minutes < 60) {
    return minutes + " min";
  } else if (hours < 24) {
    return hours + " hrs";
  } else {
    return days + " days";
  }
}

/**
 * Call web worker chain, render, and measure
 * @param {string} input Text to process
 * @param {string} lang Language-code
 */
function run(input, lang) {
  const results = {};
  return readabilityWorker
    .postMessage({ input: input, lang: lang })
    .then(function(response) {
      results.data = response;
      console.debug("Readability: " + msToTime(performance.now() - start));
      renderScore(results.data);
      console.debug("Score: " + msToTime(performance.now() - start));
      const nlcst = results.data.setup.nlcst;
      return paragraphsWorker.postMessage({ nlcst });
    })
    .then(function(response) {
      results.paragraphs = response;
      console.debug("Paragraphs: " + msToTime(performance.now() - start));
      document.getElementsByTagName(
        "content"
      )[0].innerHTML = Highlighter.stringify(results.paragraphs);
      const nlcst = results.paragraphs;
      return sentencesWorker.postMessage({ nlcst });
    })
    .then(function(response) {
      results.sentences = response;
      console.debug("Sentences: " + msToTime(performance.now() - start));
      document.getElementsByTagName(
        "content"
      )[0].innerHTML = Highlighter.stringify(results.sentences);
      const nlcst = results.sentences;
      return wordsWorker.postMessage({ nlcst, lang: lang });
    })
    .then(function(response) {
      results.words = response;
      console.debug("Words: " + msToTime(performance.now() - start));
      document.getElementsByTagName(
        "content"
      )[0].innerHTML = Highlighter.stringify(results.words);
    })
    .catch(function(error) {
      console.error(error);
      return Promise.reject(error);
    })
    .finally(function() {
      console.info("Final data:");
      console.info(results);
    });
}

/**
 * Render individual parts of Score
 * @param {object} data Generated data
 */
function renderScore(data) {
  document.querySelector("#consensus .description").innerHTML =
    Annotations.stats.consensus.description;
  document.querySelector("#consensus label.age").innerHTML =
    Annotations.general.age;
  document.querySelector("#consensus value.age").innerHTML = data.consensus.age;
  document.querySelector("#consensus label.grade").innerHTML =
    Annotations.general.grade;
  document.querySelector("#consensus value.grade").innerHTML =
    data.consensus.grade;
  document.querySelector("#automated-readability-index .title").innerHTML =
    Annotations.stats.automatedReadability.title;
  document
    .querySelector("#automated-readability-index .title")
    .setAttribute("title", Annotations.stats.automatedReadability.description);
  document.querySelector("#automated-readability-index label.age").innerHTML =
    Annotations.general.age;
  document.querySelector("#automated-readability-index value.age").innerHTML =
    data.interpretations.automatedReadability.age;
  document.querySelector("#automated-readability-index label.grade").innerHTML =
    Annotations.general.grade;
  document.querySelector("#automated-readability-index value.grade").innerHTML =
    data.interpretations.automatedReadability.grade;
  document.querySelector("#flesch .title").innerHTML =
    Annotations.stats.flesch.title;
  document
    .querySelector("#flesch .title")
    .setAttribute("title", Annotations.stats.flesch.description);
  document.querySelector("#flesch .value").innerHTML =
    data.interpretations.flesch;
  document.querySelector("#flesch-kincaid .title").innerHTML =
    Annotations.stats.fleschKincaid.title;
  document
    .querySelector("#flesch-kincaid .title")
    .setAttribute("title", Annotations.stats.fleschKincaid.description);
  document.querySelector("#flesch-kincaid label.age").innerHTML =
    Annotations.general.age;
  document.querySelector("#flesch-kincaid value.age").innerHTML =
    data.interpretations.fleschKincaid.age;
  document.querySelector("#flesch-kincaid label.grade").innerHTML =
    Annotations.general.grade;
  document.querySelector("#flesch-kincaid value.grade").innerHTML =
    data.interpretations.fleschKincaid.grade;
  document.querySelector("#coleman-liau .title").innerHTML =
    Annotations.stats.colemanLiau.title;
  document
    .querySelector("#coleman-liau .title")
    .setAttribute("title", Annotations.stats.colemanLiau.description);
  document.querySelector("#coleman-liau label.age").innerHTML =
    Annotations.general.age;
  document.querySelector("#coleman-liau value.age").innerHTML =
    data.interpretations.colemanLiau.age;
  document.querySelector("#coleman-liau label.grade").innerHTML =
    Annotations.general.grade;
  document.querySelector("#coleman-liau value.grade").innerHTML =
    data.interpretations.colemanLiau.grade;
  document.querySelector("#smog .title").innerHTML =
    Annotations.stats.smog.title;
  document
    .querySelector("#smog .title")
    .setAttribute("title", Annotations.stats.smog.description);
  document.querySelector("#smog label.age").innerHTML = Annotations.general.age;
  document.querySelector("#smog value.age").innerHTML =
    data.interpretations.smog.age;
  document.querySelector("#smog label.grade").innerHTML =
    Annotations.general.grade;
  document.querySelector("#smog value.grade").innerHTML =
    data.interpretations.smog.grade;
  document.querySelector("#lix .title").innerHTML = Annotations.stats.lix.title;
  document
    .querySelector("#lix .title")
    .setAttribute("title", Annotations.stats.lix.description);
  document.querySelector("#lix .value").innerHTML = data.interpretations.lix;
  document.querySelector("#rix .title").innerHTML = Annotations.stats.rix.title;
  document
    .querySelector("#rix .title")
    .setAttribute("title", Annotations.stats.rix.description);
  document.querySelector("#rix label.grade").innerHTML =
    Annotations.general.grade;
  document.querySelector("#rix value.grade").innerHTML =
    data.interpretations.rix.grade;
  document.querySelector("#count label.paragraphs").innerHTML =
    Annotations.general.paragraphs;
  document.querySelector("#count value.paragraphs").innerHTML =
    data.count.paragraphs;
  document.querySelector("#count label.sentences").innerHTML =
    Annotations.general.sentences;
  document.querySelector("#count value.sentences").innerHTML =
    data.count.sentences;
  document.querySelector("#count label.words").innerHTML =
    Annotations.general.words;
  document.querySelector("#count value.words").innerHTML = data.count.words;
  document.querySelector("#count label.syllables").innerHTML =
    Annotations.general.syllables;
  document.querySelector("#count value.syllables").innerHTML =
    data.count.syllables;
  document.querySelector("#count label.polysillabic-words").innerHTML =
    Annotations.general.polysillabicWords;
  document.querySelector("#count value.polysillabic-words").innerHTML =
    data.count.polysillabicWords;
  document.querySelector("#count label.letters").innerHTML =
    Annotations.general.letters;
  document.querySelector("#count value.letters").innerHTML = data.count.letters;
  document.querySelector("#count label.characters").innerHTML =
    Annotations.general.characters;
  document.querySelector("#count value.characters").innerHTML =
    data.count.characters;
  document.querySelector("#count label.longwords").innerHTML =
    Annotations.general.longwords;
  document.querySelector("#count value.longwords").innerHTML =
    data.count.longwords;
  document.querySelector("#count label.periods").innerHTML =
    Annotations.general.periods;
  document.querySelector("#count value.periods").innerHTML = data.count.periods;
  document.querySelector("#count label.punctuations").innerHTML =
    Annotations.general.punctuations;
  document.querySelector("#count value.punctuations").innerHTML =
    data.count.punctuations;
  document.querySelector("#count label.whitespaces").innerHTML =
    Annotations.general.whitespaces;
  document.querySelector("#count value.whitespaces").innerHTML =
    data.count.whitespaces;
}
