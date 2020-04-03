const fs = require("fs");
const path = require("path");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "trips.json"
);

const getTripsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

const getCoordinates = async array => {
  for (let trip of array) {
    axios
      .get(
        `http://secure.geonames.org/postalCodeLookupJSON?placename=${trip.destination}&username=${process.env.GEONAMES_USERNAME}`
      )
      .then(data => {
        trip.coordinates = `${data.postalcodes[0].lat},${data.postalcodes[0].lng}`;
      });
  }
};

const addWeather = async array => {
  let promises = [];
  for (let trip of array) {
    for (let date of trip.dates) {
      promises.push(
        axios
          .get(
            `https://api.darksky.net/forecast/${process.env.DARKSKY_SECRETKEY}/${trip.coordinates},${date}?exclude=minutely,hourly,flags,moonPhase,daily`
          )
          .then(response => {
            trip.weather.push(response.data.currently);
          })
      );
    }
  }
  return Promise.all(promises);
};

const getImages = async array => {
  for (let trip of array) {
    await axios
      .get(
        `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${trip.destination}`
      )
      .then(response => {
        trip.pictures.push(response.data.hits[0].largeImageURL);
        trip.pictures.push(response.data.hits[1].largeImageURL);
      });
  }
};

module.exports = class Trip {
  constructor(id, destination, startDate, endDate, venue) {
    this.id = id;
    this.destination = destination;
    this.startDate = startDate;
    this.endDate = endDate;
    this.venue = venue;
  }

  static async addTrips(trips) {
    await getCoordinates(trips);
    await addWeather(trips);
    await getImages(trips);
    await fs.writeFile(p, JSON.stringify(trips), err => {
      console.log(err);
    });
    try {
      return trips;
    } catch (err) {
      console.log(err);
    }
  }

  static fetchAll(cb) {
    getTripsFromFile(cb);
  }

  static findById(id, cb) {
    getTripsFromFile(trips => {
      const trip = trips.find(obj => obj.id === id);
      cb(trip);
    });
  }
};
