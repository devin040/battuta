const Flight = require('../models/flight');
const HotFlight = require('../models/hotflight');

exports.getAllHotFlights = (req, res, next) => {
  HotFlight.fetchAll()
    .then(([rows, fieldData]) => {
      res.json({rows});
    }).catch(err => console.log(err));
};

exports.getFlightsBy = (req, res, next) => {
  HotFlight.getFlightsBy(req.body.from, req.body.to, req.body.price)
    .then(([rows, fieldData]) => {
      res.json({ rows });
    })
    .catch(err => console.log(err));
};

exports.postAddHotFlight = (req, res, next) => {
  const id = req.body.id;
  const route = req.body.route;
  const from = req.body.from;
  const to = req.body.to;
  const depTime = req.body.depTime;
  const arrTime = req.body.arrTime;
  const price = req.body.price;
  const newHotFlight = new HotFlight(id, route, from, to, depTime, arrTime, price);
  newHotFlight.save();
};

exports.updateHotFlight = (req, res, next) => {
  HotFlight.updateByID(req.body.id, req.body.price);
};

exports.deleteHotFlight = (req, res, next) => {
  HotFlight.deleteByID(req.body.id);
};


