"use strict";

const express = require("express"),
mongoose = require("mongoose"),
Weather = require("../models/fire_risk-data-model"),
K_wind = require("./windCoeficient"),
K_pertisipation = require("./patisipationCoeficient");
//parseWeather = require('./parseWeatherReq');

let fireRisk;

exports.fireRiskCalculation = function(windSpeed, perticipetion, temperature, dewpoint){
     let Kw = K_wind.windCoefCulc(windSpeed);
     console.log('Kw =========== ' + Kw);
     let Kp = K_pertisipation.pertisipationCoefCulc(perticipetion);
     console.log('Kp =========== ' + Kp);
    // let T = temperature;
    // let d = dewpoint;
    //let Kw = 0.8;
    //let Kp = 1.4;
    //let T = 15.6;
    //let d = 7;
    let fireRiskYesterday;
    
    
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
       // console.log('doc.fireRisk (Це за минулий день) now is' + doc)
            if(doc === null) {
                
                fireRisk = (Kp * 0) + Kw * temperature * (temperature - dewpoint);
                console.log("00_______fireRisk if  fireRiskYesterday = 0: " + fireRisk);
               // return fireRisk;
               return fireRisk;
                } else { 
                fireRiskYesterday = doc.fireRisk;
                console.log('11____________ fireRiskYesterday is FROM fireRiskCalculation FUNCTION: ' + fireRiskYesterday );
                     //  let fireRiskYesterday = 200;
                     //  Формула розрахунку комплексного показника за Гуменюком В.
                     fireRisk = (Kp * fireRiskYesterday) + Kw * temperature * (temperature - dewpoint);
                   console.log("fireRisk for today is : " + fireRisk);
                    // return fireRisk;
                    return fireRisk;
            }

    }
    console.log("FIRE RISK AFTER WEATHER FIND FUNC IS: " + fireRisk);
    console.log("FIRE fireRiskYesterda  WEATHER FIND FUNC IS: " + fireRiskYesterday);
     return fireRisk;
}); 
    
   return fireRisk;


//console.log('Hello from parent function --' + a);
//return a;

};



