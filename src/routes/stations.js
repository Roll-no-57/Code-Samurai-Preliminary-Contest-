const express = require("express");
const router = express.Router(/* { mergeParams: true } */);

// Require controllers.
const stationsController = require("../controllers/stationsController");

router.get("/stations", stationsController.get_stations);

router.post("/stations", stationsController.create_station);

router.get("/stations/:station_id/trains" , stationsController.get_station_trains);


module.exports = router;