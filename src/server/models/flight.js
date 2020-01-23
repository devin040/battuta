const db = require('../database.js');

module.exports = class Flight {
  constructor(id, from, to, depDate, arrDate, legs, price) {
    this.id = id;
    this.from = from;
    this.to = to;
    this.depDate = depDate;
    this.arrDate = arrDate;
    this.legs = legs;
    this.price = price;
  }

  static flightGet(startDate, endDate, cities) {
    // return queryRes =  db.execute(`SELECT fromPort, toPort, carrier, depTime, arrTime, price ` +
    //                   `FROM routes NATURAL JOIN flightPrices ` +
    //                   `WHERE fromPort = '${cities[0]}' AND toPort = '${cities[1]}' ` +
    //                   `GROUP BY price ASC ` +
    //                   `LIMIT 3`);

    if(cities.length < 5) {
      let emptyCount = 5 - cities.length;
      for(let i = 0; i < emptyCount; i++) {
        cities.push("X");
      }
    }

    return db.execute(`CALL GetCheapestFlight('${cities[0]}', '${cities[1]}', '${cities[2]}', '${cities[3]}', '${cities[4]}')`);
  }

  static threeCitySearch(cities, dates){
    // cities = ["LHR", "MAD", "CDG", "TXL", "LHR"];
    // dates = ["2019-12-03", "2019-12-08", "2019-12-12", "2019-12-17"];
    return db.execute(`CALL threeCityFlight('${cities[0]}', '${cities[1]}', '${cities[2]}', '${cities[3]}', '${cities[4]}', '${dates[0]}', '${dates[1]}', '${dates[2]}', '${dates[3]}' )`);
  }

  static twoCitySearch(cities, dates){
    //cities = ["LHR", "AMS", "BCN", "LHR"];
    //dates = ["2019-12-03", "2019-12-08", "2019-12-12"];
    return db.execute(`CALL twocitysearch('${cities[0]}', '${cities[1]}', '${cities[2]}', '${cities[3]}', '${dates[0]}', '${dates[1]}', '${dates[2]}')`);
  }

  static oneCitySearch(cities, dates){
    //cities = ["LHR", "CPH", "LHR"];
    //dates = ["2019-12-03", "2019-12-08"];
    return db.execute(`CALL onecitysearch('${cities[0]}', '${cities[1]}', '${cities[2]}',  '${dates[0]}', '${dates[1]}')`);
  }

  static basicSearch(cities, dates){
    //cities = ["DUB", "TXL"];
    //dates = ["2019-12-03"];
    return db.execute(`CALL basicsearch('${cities[0]}', '${cities[1]}', '${dates[0]}')`);
  }
};
