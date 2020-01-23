const db = require('../database.js');

module.exports = class HotFlight {
  constructor(id, route, from, to, depDate, arrDate, price) {
    this.id = id;
    this.route = route;
    this.from = from;
    this.to = to;
    this.depDate = depDate;
    this.arrDate = arrDate;
    this.price = price;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM hotflights');
  }

  static getFlightsBy(from, to, price) {
    return db.execute('SELECT _id, fromPort, toPort, carrier, depTime, arrTime, price  '
                      + 'From routes natural join flightPrices '
                        + 'where fromPort = ? && toPort = ? && price <= ? ', [from, to, price]);
  }

  save() {
    db.execute('INSERT INTO hotflights(_id, routeid, fromPort, toPort, depTime, arrTime, price )'
                + ' values(?,?,?,?,?,?,?)', [this.id, this.route, this.from, this.to, this.depDate, this.arrDate, this.price]);
    console.log("Added flight to hotflights table.");
  }

  static updateByID(id, price) {
    db.execute('UPDATE hotflights SET price=? WHERE _id = ?', [price, id]);
    console.log("Updated flight from hotflights table.");
  }

  static deleteByID(id) {
    db.execute('DELETE FROM hotflights WHERE _id = ?', [id]);
    console.log("Deleted flight from hotflights table.");
  }
}
