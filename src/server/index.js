const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
//set up dotenv
const dotenv = require("dotenv");
dotenv.config();

//Aylien SDK
const AYLIENTextAPI = require("aylien_textapi");
var textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

//initialise express
const app = express();
const cors = require("cors");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//set directory to serve express app
app.use(express.static("dist"));
app.use(cors());

app.get("/", function(req, res) {
  res.sendFile("dist/index.html");
});

const apiCall = (req, res) => {
  var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if (pattern.test(req.body.text)) {
    return textapi.sentiment(
      {
        url: req.body.text,
        mode: req.body.mode
      },
      function(error, response) {
        if (error === null) {
          res.send(response);
        }
      }
    );
  } else {
    return textapi.sentiment(
      {
        text: req.body.text,
        mode: req.body.mode
      },
      function(error, response) {
        if (error === null) {
          res.send(response);
        }
      }
    );
  }
};

app.post("/analyse", function(req, res) {
  console.log(req.body);
  apiCall(req, res);
});

//allows the port to be set by the hosting platform
var port = process.env.PORT || 8080;
// designates what port the app will listen to for incoming requests
app.listen(port, function() {
  console.log(`Visit the website at: http://127.0.0.1:${port}/`);
});
