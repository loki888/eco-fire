"use strict";
const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Temperature = require("./models/Temperature.model"),
    Weather = require("./models/fire_risk-data-model"),


    cron = require('node-cron'),
    //ajax = require("node.ajax"),
    port = 3000,
    request = require('request'),
    parseWeather = require('./calculation/parseWeatherReq'),
    K_wind = require("./calculation/windCoeficient"),
    K_pertisipation = require("./calculation/patisipationCoeficient"),
    fireRiskCalculation = require("./calculation/fireRiskCalculation");



    

var promise = mongoose.connect('mongodb://localhost/eco_fire', {
  useMongoClient: true,
  /* other options */
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Conected to MongoDB");
});



//Middlewere
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('views', './views');
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


//Routs
app.get("/", function(req, res) {
    res.render("landing");
});
app.get("/map", function(req, res) {
    res.send("It will be a map soon!)");
});



app.listen(port, function() {
    console.log("The Fire Ecology Server has started on adress: http://localhost:" + port  );
});
