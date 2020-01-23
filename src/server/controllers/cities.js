let MongoClient = require("mongodb").MongoClient;
let mongoUrl = "mongodb://localhost:27017/attractions";

exports.getPlaces = (req, res, next) => {
    MongoClient.connect(mongoUrl, function(err, client) {
        let db = client.db("attractions");
        let cursor = db.collection('visitingsites').find({"city": req.body.city});
        cursor.each(function(err, item) {
            if (item != null) {
                let allSights = [];
                item.topSights.forEach(function (sight) {
                    allSights.push({"name": sight.name, "location": sight.location, "link": sight.link});
                })
                res.json({"allSights":  allSights});
            }
        });
        client.close();
    });
};

exports.getCosts = (req, res, next) => {
    MongoClient.connect(mongoUrl, function(err, client) {
        let db = client.db("attractions");
        let cursor = db.collection('visitingsites').find({"city": req.body.city});
        cursor.each(function(err, item) {
            if (item != null) {
                let costOfLiving = 0;
                item.costs.forEach(function (expense) {
                    if(expense.item === "Basic (Electricity, Heating, Cooling, Water, Garbage) for 915 sq ft" +
                        " Apartment") {
                        costOfLiving = expense.cost;
                    }
                })
                res.json({"costOfLiving":  costOfLiving});
            }
        });
        client.close();
    });
};

exports.newPlace = (req, res, next) => {
    MongoClient.connect(mongoUrl, function(err, client) {
        let db = client.db("attractions");
        db.collection('visitingsites', function(err, collection) {
            let newAttractionInsert = {
                "name": req.body.newplacename,
                "location": req.body.newplacelocation,
                "link": req.body.newplacelink
            };
            collection.updateOne(
                {city: req.body.city},
                {$push: {'topSights': newAttractionInsert}}
            ,function(err, result) {
                if(err) {
                    res.send({"Error": "error while adding new attraction to city = " + req.body.city});
                } else {
                    console.log("Success: added new attraction to city = " + req.body.newplacename);
                    res.send(result[0]);
                }
            });
        });

        client.close();
    });
};






