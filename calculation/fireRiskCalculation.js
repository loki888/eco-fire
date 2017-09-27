"use strict";

const express = require("express"),
mongoose = require("mongoose"),
Weather = require("../models/fire_risk-data-model"),
K_wind = require("./windCoeficient"),
K_pertisipation = require("./patisipationCoeficient");
//parseWeather = require('./parseWeatherReq');

let a;

exports.fireRiskCalculation = function(){
    // let Kw = K_wind.windCoefCulc();
    // let Kp = K_pertisipation.pertisipationCoefCulc();
    // let T = temperature;
    // let d = dewpoint;
    let Kw = 0.8;
    let Kp = 1.4;
    let T = 15.6;
    let d = 7;
    let fireRiskYesterday;
    let fireRisk;
    
    //let query = Weather.find({}, {_id: 0}).sort({'date': -1}).limit(3);
  


   //let query = Weather.find({}, {_id: 0}).sort({'date': -1}).limit(1);

  /*  let query = Weather.findOne({_id: id}, function (err, doc) { 
       if (err) {console.log('Have some error!!! With model: Weather')} else {
        console.log('Функція повернула: ' + doc.fireRisk);
        return doc.fireRisk;
       }
   
   }); */

    
    Weather.findOne({}, {}, { sort: { 'date' : -1 } }, function (err, doc) { 
    if (err) {console.log('Have some error!!! With model: Weather')} else {
     console.log(doc.fireRisk);

     fireRiskYesterday = doc.fireRisk;
     console.log('fireRiskYesterday is: ' + fireRiskYesterday );
         //  let fireRiskYesterday = 200;
         //  Формула розрахунку комплексного показника за Гуменюком В.
         fireRisk = (Kp * fireRiskYesterday) + Kw * T * (T - d);
         console.log("fireRisk for today is : " + fireRisk);
        // return fireRisk;
         a = fireRisk;
    }
   
    // return fireRisk;
}); 




console.log('Hello from parent function --' + a);
return a;

};



