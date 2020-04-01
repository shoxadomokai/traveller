const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
//set up dotenv
const dotenv = require("dotenv");
dotenv.config();

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

const tripRoutes = require("./routes/trip");
app.use(tripRoutes);

//allows the port to be set by the hosting platform
var port = process.env.PORT || 8000;
// designates what port the app will listen to for incoming requests
app.listen(port, function() {
  console.log(`Visit the website at: http://127.0.0.1:${port}/`);
});
