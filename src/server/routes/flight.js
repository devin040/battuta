const path = require('path');
const express = require('express');
const flightController = require('../controllers/flight');
const attractionsController = require ("../");

const router = express.Router();

router.post('/search', flightController.searchFlights);

router.post('/threecitysearch', flightController.threeCitySearchFlights);

router.post('/twocitysearch', flightController.twoCitySearchFlights);

router.post('/onecitysearch', flightController.oneCitySearchFlights);

router.post('/basicsearch', flightController.basicSearchFlights);

//router.post('/attractions' urfunctionfile);

module.exports = router;
