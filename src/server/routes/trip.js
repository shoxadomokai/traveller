const path = require("path");
const express = require("express");

const tripController = require("../controllers/trip");

const router = express.Router();

router.post("/trips", tripController.postTrips);
router.get("/trips", tripController.getTrips);

module.exports = router;
