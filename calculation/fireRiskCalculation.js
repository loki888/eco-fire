"use strict";

const express = require("express"),
mongoose = require("mongoose"),
Weather = require("../models/fire_risk-data-model"),
K_wind = require("../calculation/windCoeficient"),
K_pertisipation = require("../calculation/patisipationCoeficient");
//parseWeather = require('./parseWeatherReq');


exports.fireRiskCalculation = function(){
    let Kw = K_wind.windCoefCulc();
    let Kp = K_pertisipation.pertisipationCoefCulc();
    let T = temperature;
    let d = dewpoint;
    let fireRiskYesterday;

    // Формула розрахунку комплексного показника за Гуменюком В.
    fireRisk = (Kp * fireRiskYesterday) + Kw * T * (T - d);
    return fireRisk;
};



module.exports = fireRiskCalculation;