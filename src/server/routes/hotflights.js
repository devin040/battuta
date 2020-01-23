const path = require('path');
const express = require('express');
const hotFlightController = require('../controllers/hotflights');

const router = express.Router();

//router.get('/flighttest', flightController.getFlights);

router.get('/', hotFlightController.getAllHotFlights);

router.get('/getby', hotFlightController.getFlightsBy);

router.post('/add', hotFlightController.postAddHotFlight);

router.post('/update', hotFlightController.updateHotFlight);

router.delete('/delete', hotFlightController.deleteHotFlight);

module.exports = router;
