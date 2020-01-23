const path = require('path');
const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const flightRoutes = require('./routes/flight');
const hotFlights = require('./routes/hotflights');
const cityRoutes = require('./routes/cities');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));


app.use('/api/hotflights', hotFlights);
app.use('/api/flight', flightRoutes);
app.use('/api/cities',cityRoutes);
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

app.listen(8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
