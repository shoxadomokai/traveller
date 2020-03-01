const textToAnalyse = document.getElementById("analyseText");
const readMoreButton = document.getElementById("read-more");

const inputType = document.getElementById("input-type");
const formElements = document.getElementById("submission-form");

const resultsShowing = document.getElementById("results-available");
const resultsUnavailable = document.getElementById("no-results");
const loadingScreen = document.getElementById("loading");

//post
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

export const urlValidate = isURL => {
  var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if (pattern.test(isURL)) {
    return true;
  } else {
    return false;
  }
};

const disableClicks = boolean => {
  for (let formElement of formElements.elements) {
    if (boolean === true) {
      formElement.setAttribute("disabled", `${boolean}`);
    } else {
      formElement.removeAttribute("disabled");
      checkContent();
    }
  }
};

const showResults = boolean => {
  if (boolean === true) {
    resultsUnavailable.setAttribute("class", "hidden");
    loadingScreen.setAttribute("class", "hidden");
    resultsShowing.setAttribute("class", "");
  } else if (boolean === loading) {
    resultsUnavailable.setAttribute("class", "hidden");
    loadingScreen.setAttribute("class", "");
    loadingScreen.classList.add("play");
    resultsShowing.setAttribute("class", "hidden");
  } else {
    resultsUnavailable.setAttribute("class", "");
    loadingScreen.setAttribute("class", "hidden");
    resultsShowing.setAttribute("class", "hidden");
  }
};

export const checkContent = () => {
  if (textToAnalyse.value == "") {
    document.getElementById("submit-button").setAttribute("disabled", "true");
  } else if (textToAnalyse.oldValue !== textToAnalyse.value) {
    textToAnalyse.oldValue = textToAnalyse.value;
    document.getElementById("submit-button").removeAttribute("disabled");
  }

  //show text type indicator
  if (urlValidate(textToAnalyse.value)) {
    inputType.classList.remove("text");
    inputType.classList.add("url");
  } else {
    inputType.classList.remove("url");
    inputType.classList.add("text");
  }
};

export const handleSubmit = event => {
  event.preventDefault();
  disableClicks(true);
  showResults(loading);
  var text = document.getElementById("analyseText").value;
  var mode = document.getElementById("document-mode").value;
  postData("http://localhost:8081/analyse", {
    text,
    mode
  }).then(newData => {
    showResults(true);
    disableClicks(false);
    Client.DOMManipulation(newData);
    if (urlValidate(text)) {
      readMoreButton.classList.remove("hidden");
      readMoreButton.href = text;
    } else {
      readMoreButton.classList.add("hidden");
    }
  });
};
