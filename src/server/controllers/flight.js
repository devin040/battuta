const Flight = require('../models/flight');
const HotFlight = require('../models/hotflight');

exports.searchFlights = (req, res, next) => {
    Flight.flightGet(req.body.startDate, req.body.endDate, req.body.cities)
        .then(([rows, fieldData]) => {
            res.json({ rows });
        })
        .catch(err => console.log(err));
};

exports.threeCitySearchFlights = (req, res, next) => {
    Flight.threeCitySearch(req.body.cities, req.body.dates)
        .then(([rows, fieldData]) => {
            res.json({ rows });
        })
        .catch(err => console.log(err));
};

exports.twoCitySearchFlights = (req, res, next) => {
    Flight.twoCitySearch(req.body.cities, req.body.dates)
        .then(([rows, fieldData]) => {
            res.json({ rows });
        })
        .catch(err => console.log(err));
};

exports.oneCitySearchFlights = (req, res, next) => {
    Flight.oneCitySearch(req.body.cities, req.body.dates)
        .then(([rows, fieldData]) => {
            res.json({ rows });
        })
        .catch(err => console.log(err));
};

exports.basicSearchFlights = (req, res, next) => {
    Flight.basicSearch(req.body.cities, req.body.dates)
        .then(([rows, fieldData]) => {
            res.json({ rows });
        })
        .catch(err => console.log(err));
};