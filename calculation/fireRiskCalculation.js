"use strict";

const express = require("express"),
mongoose = require("mongoose"),
Weather = require("../models/fire_risk-data-model"),
K_wind = require("./windCoeficient"),
K_pertisipation = require("./patisipationCoeficient");
//parseWeather = require('./parseWeatherReq');


exports.fireRiskCalculation = function(){
    // let Kw = K_wind.windCoefCulc();
   // let Kp = K_pertisipation.pertisipationCoefCulc();
    // let T = temperature;
    // let d = dewpoint;
    let Kw = 0.8;
    let Kp = 1.4;
    let T = 15.6;
    let d = 7;

    // let fireRiskYesterday = Weather.find({}, {_id: 0}).sort({'date': -1}).limit(1);

    let fireRiskYesterday = 200;
    // Формула розрахунку комплексного показника за Гуменюком В.
    let fireRisk = (Kp * fireRiskYesterday) + Kw * T * (T - d);
    console.log(fireRisk);
    return fireRisk;
};



