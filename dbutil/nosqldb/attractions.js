var express = require("express");
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var port = 3000;
var mongoose = require("mongodb")
 
/*var attractionSchema = new mongoose.Schema({
    name: String,
    location: String,
    link: String
});*/

//mongoimport --db=attractions --collection=visitingsites --file=citiesimport.json --jsonArray 

var MongoClient = mongoose.MongoClient;
MongoClient.connect("mongodb://localhost:27017/attractions", function(error,database){
    if (error) return process.exit(1);
    console.log('Connection is okay');
    const db = database.db('attractions');
    //var cursor = db.collection('visitingsites').find();
    //cursor.forEach(function(a){
        //console.log(a.topSights)
    //});
    /*app.get("/", (req, res) => {
        /*let cityplaces = new Array();
        var str="";
        var cursor = db.collection('visitingsites').find({},{city:1,_id:0},function(err,docs){
            docs.each(function(err,doc){
                if(doc)
                {
                    var str="";
                    //console.log(doc.city);
                    str+=doc.city+" ";
                    //console.log(str);
                   
                }
            });
            console.log(str);
        });
        /*cursor.each(function(a){
            //console.log(a.city);
            str+=a.city+" ";
        });
        console.log(str);
        var cursor = db.collection('visitingsites').find({},{city:1,_id:0}).toArray();
        if (cursor.length > 0) { console.log (cursor[0]); }
     });*/
     
     app.get("/places", (req, res) => {
        db.collection('visitingsites').find({"city":"Amsterdam"},function(err,docs){
            if(err) return next(err);
            docs.each(function(err,doc){
                if(doc) {
                    var pla = "";
                    doc.topSights.forEach(function(item){
                        var place_name = item.name;
                        var place_location = item.location;
                        var place_link = item.link;
                        console.log(place_name+' '+place_location+' '+place_link);
                        pla+=place_name+" ";
                    })
                    res.send(pla);
                }
            });
        });
     });

     app.get("/cost",(req,res) => {
        db.collection('visitingsites').find({"city":"Amsterdam"}).forEach(function(mydoc){
            var sum=0;
            for(var i=0;i<mydoc.costs.length;i++)
            {
                sum+=parseInt(mydoc.costs[i].cost);
            }
            if(sum>2000)
            {
                //var res1 = "Average Cost of Living is high " + sum.toString();
                res.status(200).send(sum.toString());
            }
            else
            {
                //var res1 = "Average Cost of Living is low " + sum.toString();
                res.status(200).send(sum.toString());
            }
             
        });
        
     });

     app.post("newplaces",(req,res) => {
         //var attraction_name = req.body.attraction_name;
         //var city_name = req.body.city_name;
         db.collection('visitingsites').update(
             { "city":req.body.city_name },
             {
                 $push:{"topSights":{"name":req.body.attraction_name , "location":req.body.city_name}}
             });

         /*db.collection('visitingsites').update(
             {city:id},
             {
                 $push: {
                     topSights : {
                         $each : attraction_name,
                         $position: -1
                     }
                 }
             }
         )*/

     });


    });
 
/*app.post("/addplaces",(req,res) => {

})*/
app.listen(port, () => {
  console.log("Server listening on port " + port);
});