import { getData } from "./formHandler.js";
import { countdownMaker } from "./countdown.js";
import Litepicker from "litepicker";

import clearDay from "../images/clear-day.svg";
import partlyCloudy from "../images/partly-cloudy-day.svg";
import cloudy from "../images/cloudy.svg";
import rain from "../images/rain.svg";
import sleet from "../images/sleet.svg";
import snow from "../images/snow.svg";
import wind from "../images/wind.svg";
import fog from "../images/fog.svg";

const moment = require("moment");
const toDos =
  localStorage.getItem("toDos") === null
    ? []
    : JSON.parse(localStorage.getItem("toDos"));

const goBack = () => {
  location.reload();
};

export const launchToDo = () => {
  const sections = document.querySelectorAll(".tabs > section");
  const links = document.querySelectorAll(".tab-menu-items");
  for (let section of sections) {
    if (section.getAttribute("data-tab") == "to-do") {
      section.classList.add("d-block");
      section.scrollIntoView({
        behavior: "smooth"
      });
    } else {
      section.classList.remove("d-block");
    }
  }
  for (let link of links) {
    if (link.getAttribute("data-nav") == "to-do") {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  }
};

export const resultsJS = () => {
  const tabMenu = document.getElementById("tab-menu");
  const sections = document.querySelectorAll(".tabs > section");
  const locationSections = document.querySelector("#locations");
  const goBackButton = document.querySelector("#go-back");
  const toDoInput = document.querySelector("#to-do__activity");
  const toDoDate = document.querySelector("#to-do__date");
  const toDoLocation = document.querySelector("#to-do__location");
  const toDoButton = document.querySelector("#to-do__button");
  const toDoSection = document.querySelector("#all-to-dos");

  var picker = new Litepicker({
    element: toDoDate,
    format: "D MMM, YYYY",
    numberOfMonths: 1,
    // numberOfColumns: 2,
    minDate: moment().format("D MMMM, YYYY"),
    maxDate: null,
    selectForward: false,
    selectBackward: false,
    splitView: false,
    singleMode: true,
    autoApply: true,
    showWeekNumbers: false,
    showTooltip: true,
    disableWeekends: false,
    mobileFriendly: true,
    onSelect: function(start) {
      var str = "";
      str += start ? start.format("Do MMMM YYYY") : "";
      toDoDate.value = str;
    }
  });

  goBackButton.addEventListener("click", goBack);
  tabMenu.addEventListener("click", event => {
    let siblings = event.target.parentNode.childNodes;

    //add and remove active
    for (let sibling of siblings) {
      if (sibling.classList) {
        sibling.classList.remove("active");
      }
    }
    event.target.classList.add("active");

    for (let section of sections) {
      if (
        event.target.getAttribute("data-nav") ==
        section.getAttribute("data-tab")
      ) {
        section.classList.add("d-block");
        section.scrollIntoView({
          behavior: "smooth"
        });
      } else {
        section.classList.remove("d-block");
      }
    }
  });
  toDoButton.addEventListener("click", event => addToDo(event));

  const createTripLayout = trip => {
    const tripComponent = `
    <h3 class="title text-center my-5">${trip.tripRange.toUpperCase()}</h3>
      <div class="card mb-5">
                <div class="row">
                    <div class="col-lg-6 trip-image" style="background-image: url(${
                      trip.pictures[0]
                    });">
                        <div class="time-left">
                            <p class="display-2 title mb-0">${
                              trip.dates.length
                            }</p>
                            <span>NIGHTS</span>
                        </div>
                        <div class="location-details my-5">
                            <h2 class="display-3 title">${trip.destination}</h2>
                            <p>${trip.venue ? trip.venue : ""}.</p>
                        </div>
                        <div class="countdown-section">
                            <p class="mb-0">TIME LEFT TILL YOUR TRIP</p>
                            <ul class="countdown d-flex">
                                <li class="countdown-digit text-center mr-3">
                                    <h1 id="days${
                                      trip.id
                                    }" class="title display-4 mb-0"></h1>
                                    <span class="small">Days</span>
                                </li>
                                <li class="countdown-digit text-center mr-3">
                                    <h1 id="hours${
                                      trip.id
                                    }" class="title display-4 mb-0"></h1>
                                    <span class="small">Hours</span>
                                </li>
                                <li class="countdown-digit text-center mr-3">
                                    <h1 id="minutes${
                                      trip.id
                                    }" class="title display-4 mb-0"></h1>
                                    <span class="small">Minutes</span>
                                </li>
                                <li class="countdown-digit text-center mr-3">
                                    <h1 id="seconds${
                                      trip.id
                                    }" class="title display-4 mb-0"></h1>
                                    <span class="small">Seconds</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="trip-info">
                            <div class="trip-info__header d-flex align-items-center justify-content-between">
                                <h4 class="title">Activities</h4>
                                <button onclick="return Client.launchToDo()" class="btn btn-primary launch-to-do">Add To-Do Item</button>
                            </div>
                            <div class="trip-info__activities">
                                ${setToDoComponent(trip)}
                            </div>
                            <div class="trip-info__header">
                                <h4 class="title">Weather Forecasts</h4>
                            </div>
                            <div class="trip-info__forecasts">
                                ${trip.weather.map(weatherValue =>
                                  createWeatherLayout(weatherValue)
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

    locationSections.insertAdjacentHTML("beforeend", tripComponent);
  };

  const createWeatherLayout = weather => {
    return `<div class="trip-info__forecast mt-4">
                                    <div class="weather-icon">
                                        <img src="../images/cloudy.svg" alt="" class="${
                                          weather.icon
                                        }">
                                    </div>
                                    <div class="weather-info">
                                        <div class="weather-condition">
                                            <p class="display-4">${Math.round(
                                              weather.temperature
                                            )}<sup style="font-size: 50%;">F</sup></p>
                                            <span>${weather.summary}</span>
                                        </div>
                                        <div class="weather-day">
                                            <span class="day">${moment
                                              .unix(weather.time)
                                              .format("dddd")}</span>
                                            <p class="date">${moment
                                              .unix(weather.time)
                                              .format("DD MMMM, YYYY")}</p>
                                        </div>
                                    </div>
                                </div>`;
  };

  const setToDoComponent = trip => {
    return toDos.map(toDo => {
      if (trip.dates.includes(moment(new Date(toDo.date)).format("X"))) {
        return `<div class="trip-info__activity card">
              <div class="card-header">${toDo.date}</div>
              <div class="card-body">
                <p class="card-text">${toDo.activity}</p>
                <p class="card-text"><small class="text-muted">${toDo.location}</small></p>
               </div>
            </div>`;
      }
    });
  };

  const createToDoComponent = toDo => {
    const toDoComponent = `<div class="col-md-4 col-6">
                            <div class=" card">
                              <div class="card-header">${toDo.date}</div>
                              <div class="card-body">
                                <p class="card-text">${toDo.activity}</p>
                                <p class="card-text"><small class="text-muted">${toDo.location}</small></p>
                              </div>
                             </div> 
                           </div>`;

    toDoSection.insertAdjacentHTML("beforeend", toDoComponent);
  };

  const insertWeatherIcons = () => {
    const images = document.getElementsByTagName("img");
    for (let image of images) {
      switch (true) {
        case image.classList.contains("clear-day") ||
          image.classList.contains("clear-night"):
          image.src = clearDay;
          break;
        case image.classList.contains("partly-cloudy-day") ||
          image.classList.contains("partly-cloudy-night"):
          image.src = partlyCloudy;
          break;
        case image.classList.contains("cloudy"):
          image.src = cloudy;
          break;
        case image.classList.contains("rain"):
          image.src = rain;
          break;
        case image.classList.contains("sleet"):
          image.src = sleet;
          break;
        case image.classList.contains("snow"):
          image.src = snow;
          break;
        case image.classList.contains("wind"):
          image.src = wind;
          break;
        case image.classList.contains("fog"):
          image.src = fog;
          break;
      }
    }
  };

  const animateHeader = (link, add) => {
    document.getElementById(
      "trips_header"
    ).style.backgroundImage = `url(${link})`;
    const locations = document.querySelectorAll(".trip_location");
    for (let location of locations) {
      location.innerHTML = add;
    }
  };

  const addToDo = event => {
    event.preventDefault();
    const toDo = {
      activity: toDoInput.value,
      date: toDoDate.value,
      location: toDoLocation.value
    };
    toDos.push(toDo);
    toDoInput.value = "";
    toDoDate.value = "";
    toDoLocation.value = "";
    createToDoComponent(toDo);
    localStorage.setItem("toDos", JSON.stringify(toDos));
  };

  getData("/trips").then(data => {
    for (let trip of data) {
      trip.weather.sort(function(a, b) {
        return a.time - b.time;
      });
      createTripLayout(trip);
      countdownMaker(trip.dates[0], trip.id);
      insertWeatherIcons();
    }
    if (toDos.length > 0) {
      toDos.forEach(toDo => createToDoComponent(toDo));
    }
    animateHeader(data[0].pictures[1], data[0].destination);
  });
};
