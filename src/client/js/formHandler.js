import Litepicker from "litepicker";
import { resultsJS } from "./results.js";
import { launchToDo } from "./results.js";

const path = require("path");
const moment = require("moment");

const addFormField = document.getElementById("add-form-field");
const travellerForm = document.getElementById("traveller-form");
const travellerFormButton = document.getElementById("form-traveller__button");

//variables
let input = 1;
const trips = [];
const inputs = [1];
let deleteButtons;
let minDate = moment().format("D MMMM, YYYY");

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

//get
export const getPage = async (url = "") => {
  const response = await fetch(url, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/text"
    }
  });

  try {
    const page = await response.text();
    return page;
  } catch (error) {
    console.log("error", error);
  }
};

export const getData = async (url = "") => {
  const response = await fetch(url);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

//create a new form field
const createForm = input => {
  const formLayout = `
    <div class="line"></div>
    <span class="d-flex w-100 align-items-center">
      <div class="input-wrapper">
        <div class="form-group">
          <input type="text" class="form-control" id="inlineFormInput${input}1" placeholder=" ">
          <label for="inlineFormInput${input}1">Where are you going?</label>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" id="inlineFormInput${input}2" placeholder=" ">
          <label class="date-picker" for="inlineFormInput${input}2">Check In - Check Out</label>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" id="inlineFormInput${input}3" placeholder=" ">
          <label for="inlineFormInput${input}3">Where are you staying?</label>
        </div>
      </div>
      <span class="delete"></span>
    </span>  
  `;

  addFormField.insertAdjacentHTML("beforebegin", formLayout);
};

addFormField.addEventListener("click", () => {
  input++;
  inputs.push(input);
  createForm(input);
  deleteFormField();
  addDatePicker(minDate);
});

//delete the form fields
const deleteFormField = () => {
  //get all the delete buttons at the moment of clicking
  deleteButtons = document.getElementsByClassName("delete");
  for (let index = 0; index < deleteButtons.length; index++) {
    //add an event listener to each delete button
    deleteButtons[index].addEventListener("click", function() {
      //overwrite the previous minimum date in the date pickers so previously selected dates are available again
      minDate = document
        .getElementById(`inlineFormInput${index + 1}2`)
        .value.split(/\s*\-\s*/g)[1];

      //delete the form field and the dividing line
      travellerForm.removeChild(this.parentNode.previousElementSibling);
      travellerForm.removeChild(this.parentNode);

      //update the inputs and trips
      inputs.splice(index + 1, 1);
      trips.splice(index + 1, 1);
      input--;
    });
  }
};

//fetch the results page
export const getResults = () => {
  return getPage("/results.html").then(page => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(page, "text/html");
    var body = doc.querySelector("body");
    document.body = body;
  });
};

//submit form
export const extractInput = async event => {
  event.preventDefault();
  createTrip();
  animateSubmit();
  await getCoordinates();
  await postData("/trips", trips);
  await setTimeout(deanimateSubmit, 1000);
  await getResults();
  resultsJS();
  launchToDo;
};

const animateSubmit = () => {
  travellerFormButton.classList.add("animate");
  travellerFormButton.classList.remove("w-100");
};

const deanimateSubmit = () => {
  setTimeout(() => {
    travellerFormButton.classList.remove("animate");
    travellerFormButton.classList.add("w-100");
  }, 10000);
};

// add date picker to the date fields
const addDatePicker = arg => {
  for (let input of inputs) {
    const dateField = document.getElementById(`inlineFormInput${input}2`);
    var picker = new Litepicker({
      element: dateField,
      format: "D MMM, YYYY",
      numberOfMonths: 4,
      numberOfColumns: 2,
      minDate: arg,
      maxDate: null,
      selectForward: false,
      selectBackward: false,
      splitView: false,
      singleMode: false,
      autoApply: true,
      showWeekNumbers: false,
      showTooltip: true,
      disableWeekends: false,
      mobileFriendly: true,
      onSelect: function(start, end) {
        //update the mindate after selecting
        minDate = end.format("D MMMM, YYYY");
        var str = "";
        str += start ? start.format("Do MMMM YYYY") + " to " : "";
        str += end ? end.format("Do MMMM YYYY") : "...";
        dateField.value = str;
      }
    });
  }
};

//create the individual trip object and push to the trips array
const createTrip = () => {
  for (let input of inputs) {
    const trip = {
      id: "",
      destination: "",
      tripRange: "",
      venue: "",
      pictures: [],
      dates: [],
      weather: [],
      coordinates: ""
    };
    //assign input values into the trip object
    trip.id = input;
    trip.destination = document.getElementById(
      `inlineFormInput${input}1`
    ).value;
    trip.venue = document.getElementById(`inlineFormInput${input}3`).value;
    trip.tripRange = document.getElementById(`inlineFormInput${input}2`).value;
    trip.dates = getDates(
      trip.tripRange.split(/\s*\-\s*/g)[0],
      trip.tripRange.split(/\s*\-\s*/g)[1]
    );

    //check to see if the trip object has been previously created by matching the ids
    const tripData = trips.find(
      individualTrip => individualTrip.id === trip.id
    );

    //if trip object already exists. overwrite the trip data (in case user changes the information stored inside)
    if (tripData) {
      tripData.id = input;
      tripData.destination = document.getElementById(
        `inlineFormInput${input}1`
      ).value;
      tripData.venue = document.getElementById(
        `inlineFormInput${input}3`
      ).value;
      tripData.tripRange = document.getElementById(
        `inlineFormInput${input}2`
      ).value;
      tripData.dates = getDates(
        tripData.tripRange.split(/\s*\-\s*/g)[0],
        tripData.tripRange.split(/\s*\-\s*/g)[1]
      );
    }
    //if the trip data doesn't exist push it into the trips object
    else {
      trips.push(trip);
    }
  }
};

//get the coordinates data for dark sky api
const getCoordinates = async () => {
  for (let trip of trips) {
    await getData(
      `http://secure.geonames.org/postalCodeLookupJSON?placename=${trip.destination}&username=shox`
    ).then(data => {
      trip.coordinates = `${data.postalcodes[0].lat},${data.postalcodes[0].lng}`;
    });
  }
};

//convert date rate into an array of dates to loop through to get weather forecasts in darksky api
const getDates = (startDate, stopDate) => {
  var dateArray = [];
  var currentDate = new Date(startDate);
  var stopDate = new Date(stopDate);
  //add a date while the date is less than the stop date
  while (currentDate <= stopDate) {
    dateArray.push(moment(currentDate).format("X"));
    currentDate = moment(currentDate).add(1, "days");
  }
  return dateArray;
};

//initialise functions
window.addEventListener("DOMContentLoaded", () => {
  addDatePicker(minDate);
});
