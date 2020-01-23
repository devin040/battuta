var express = require('express');
var app = express()
var https = require('https');
const fs = require('fs');
const mariadb = require('mariadb');

var locs = ['LHR', 'CDG', 'AMS', 'MAD', 
            'BCN', 'FCO', 'DUB', 'ZRH', 'CPH', 'VIE', 'TXL'] ;

const dbAuth = {      
                host: 'localhost', 
                database: 'battuta',
                user:'devin',
                password: 'password'
              };
var errors = 0;
var flightPriceIdx = 0;

const conn= mariadb.createConnection(dbAuth)
  .then(conn => {
    console.log("connected ! connection id is " + conn.threadId);
    var dbRouteId = 0;
    for (var i = 0 ; i < locs.length; i++){
        for (var j = 0; j < locs.length; j++) {
            if (i != j){
                dbRouteId++;
                var options = {
                    host: 'api.skypicker.com',
                    path: '/flights?fly_from=' + locs[i] + '&fly_to=' + locs[j] + '&dateFrom=10/10/2019&dateTo=10/11/2019&flight_type=oneway&partner=picky',
                    headers: {
                        'Accept': 'application/json'
                    }
                };
                https.get(options, function (res) {
                    var json = '';
                
                    res.on('data', function (chunk) {
                        json += chunk;
                    });
                
                    res.on('end', async function () {
                        if (res.statusCode === 200) {
                            try {
                
                                var jsreturn = JSON.parse(json);
                                // data is available here:
                                var flights = jsreturn.data;
                                var flightLimit = flights.length;
                                if (flightLimit > 5){ flightLimit = 5}
                                
                                for (var trip = 0; trip < flightLimit; trip++){
                                    flightPriceIdx++;
                                    var legs = flights[trip].route;
                                    var currPriceId = 0;
                                    await conn.query("INSERT INTO flightPrices(routeid, carrier, depTime, arrTime, price, layovers) values (?, ?, ?, ?, ?, ?)", 
                                    [dbRouteId, flights[trip].airlines[0], flights[trip].dTime, flights[trip].aTime, flights[trip].price, (legs.length - 1)]);
                                    /**    
                                    for (var leg = 0; leg < legs.length; leg++){
                                        await conn.query("INSERT INTO flightlegs(priceID, airline, flightno, routeid, fromPort, toPort, depTime, arrTime) values (?, ?, ?, ?, ?, ?, ?, ?)",
                                        [flightPriceIdx, legs[leg].airline, legs[leg].operating_flight_no, dbRouteId, legs[leg].flyFrom, legs[leg].flyTo, legs[leg].dTime, legs[leg].aTime]);
                                    } */      
                                }
                                
                            } catch (e) {
                                console.log('Error parsing JSON!');
                            }
                        } else {
                            console.log('Status:', res.statusCode);
                        }
                    });
                    
                }).on('error', function (err) {
                    console.log('Error:', err);
                    });    
            }
        }   
    }
   }).then(console.log("Done!!")) 
  .catch(err => {
    console.log("not connected due to error: " + err);
});

/**
 * 
 * create table routes (routeid int primary key auto_increment, fromPort VARCHAR(3), toPort VARCHAR(3), routeStr VARCHAR(6));
 create table flightlegs (_id int primary key auto_increment, priceID int, airline VARCHAR(255), flightno VARCHAR(10), routeid int, fromPort VARCHAR(3), 
  toPort VARCHAR(3), depTime int(11), arrTime int(11), FOREIGN KEY (routeid) REFERENCES routes(routeid), 
 FOREIGN KEY (priceID) REFERENCES flightPrices(_id));
    
    CREATE TABLE flightPrices(_id int primary key auto_increment, routeid int, carrier VARCHAR(255), depTime int(11), arrTime int (11), price real, 
    layovers int, FOREIGN KEY (routeid) REFERENCES routes(routeid));

 */