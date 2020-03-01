import { handleSubmit } from "./js/formHandler";
import { checkContent } from "./js/formHandler";
import { DOMManipulation } from "./js/DOMManipulation";

//styles
import "./styles/resets.scss";
import "./styles/main.scss";
import "./styles/footer.scss";
import "./styles/header.scss";

import portraitLogo from "./images/potrait-logo-white.svg";
import landscapeLogo from "./images/landscape-logo-white.svg";

import defaultSentiment from "./images/default-sentiment.svg";
import negativeSentiment from "./images/negative-sentiment.svg";
import positiveSentiment from "./images/positive-sentiment.svg";
import neutralSentiment from "./images/neutral-sentiment.svg";

import highConfidence from "./images/High-Confidence.svg";
import neutralConfidence from "./images/Neutral-Confidence.svg";
import lowConfidence from "./images/Low-Confidence.svg";

const array = [1, 2, 3, 4];
let randomNumber = Math.round(Math.random() * 4);

async function importImages() {
  let imagesToLoad = array.map(async value => {
    const result = await import(`./images/0${value}.svg`);
    return result.default;
  });
  const imageURLs = await Promise.all(imagesToLoad);
  return (document.getElementById("random-image").src =
    imageURLs[randomNumber]);
}

importImages();

document.getElementById("potrait-logo").src = portraitLogo;
document.getElementById("landscape-logo").src = landscapeLogo;
document.getElementById("polarity-icon").src = defaultSentiment;
document.getElementById("confidence-icon").src = neutralConfidence;
document.getElementById("subjectivity-icon").src = neutralConfidence;

export {
  handleSubmit,
  checkContent,
  DOMManipulation,
  lowConfidence,
  neutralConfidence,
  highConfidence,
  positiveSentiment,
  negativeSentiment,
  neutralSentiment
};
