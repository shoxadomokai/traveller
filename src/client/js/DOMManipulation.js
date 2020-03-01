const resultText = document.getElementById("result__text");
const polarityStatus = document.getElementById("polarity__status");
const confidenceDegree = document.getElementById("confidence-degree");
const subjectivityDegree = document.getElementById("subjectivity-degree");

//images
const polarityIcon = document.getElementById("polarity-icon");
const confidenceIcon = document.getElementById("confidence-icon");
const subjectivityIcon = document.getElementById("subjectivity-icon");

//chart
const confidenceGraph = document.getElementById("confidence-graph");
const subjectivityGraph = document.getElementById("subjectivity-graph");

const setPolarity = res => {
  polarityStatus.innerHTML = res.polarity;
  confidenceDegree.innerHTML = res.polarity_confidence.toFixed(2);
  confidenceIcon.src = calculateSureness(res.polarity_confidence);
  calculatePercentages(confidenceGraph, res.polarity_confidence);

  switch (res.polarity) {
    case "negative":
      polarityStatus.className = "";
      polarityStatus.classList.add("polarity-negative");
      polarityIcon.src = Client.negativeSentiment;
      break;
    case "positive":
      polarityStatus.className = "";
      polarityStatus.classList.add("polarity-positive");
      polarityIcon.src = Client.positiveSentiment;
      break;
    default:
      polarityStatus.className = "";
      polarityIcon.src = Client.neutralSentiment;
  }
};

const setSubjectivity = res => {
  subjectivityDegree.innerHTML = res.subjectivity_confidence.toFixed(2);
  subjectivityIcon.src = calculateSureness(res.subjectivity_confidence);
  calculatePercentages(subjectivityGraph, res.subjectivity_confidence);
};

const calculateSureness = value => {
  if (value <= 1 / 3) {
    return Client.lowConfidence;
  } else if (value >= 1 / 3 && value <= 2 / 3) {
    return Client.neutralConfidence;
  } else {
    return Client.highConfidence;
  }
};

const calculatePercentages = (element, value) => {
  element.style.width = value * 100 + "%";
  element.className = "";
  if (value <= 1 / 3) {
    return element.classList.add("graph-low");
  } else if (value >= 1 / 3 && value <= 2 / 3) {
    return element.classList.add("graph-middle");
  } else {
    return element.classList.add("graph-high");
  }
};

export function DOMManipulation(res) {
  resultText.innerHTML = res.text;
  setPolarity(res);
  setSubjectivity(res);
}

export const calc = value => {
  if (value <= 1 / 3) {
    return "low";
  } else if (value >= 1 / 3 && value <= 2 / 3) {
    return "neutral";
  } else {
    return "high";
  }
};
