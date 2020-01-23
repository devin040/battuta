const path = require('path');
const express = require('express');
const cityController = require('../controllers/cities');


const router = express.Router();

router.post('/places', cityController.getPlaces);
router.post('/cost', cityController.getCosts);
router.post('/addplace', cityController.newPlace);


module.exports = router;
