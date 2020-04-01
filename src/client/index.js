import { extractInput } from "./js/formHandler";
import { getResults } from "./js/formHandler";
import { resultsJS } from "./js/results.js";
import { launchToDo } from "./js/results.js";

//styles
import "./styles/resets.scss";
import "./styles/main.scss";

// import "./views/index.html";
import "./views/results.html";

//set images
import "./images/hero-image.png";
import "./images/lagos.jpg";
import "./images/next.svg";
import "./images/cloudy.svg";
import "./images/poweredby-darksky.png";
import "./images/poweredby-pixabay.png";

// getResults().then(() => {
//   resultsJS();
//   launchToDo;
// });

export { extractInput, launchToDo };
