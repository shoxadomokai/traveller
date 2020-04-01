const Trip = require("../models/trip");

exports.postTrips = (req, res) => {
  Trip.addTrips(req.body).then(response => res.send(response));
};

exports.getTrips = (req, res) => {
  Trip.fetchAll(trips => {
    res.send(trips);
  });
};
