'use strict';

var momngoose  = require('mongoose');
const Schema     = momngoose.Schema;



const wetherSchema = new Schema({
    district: String,
    perticipetion: String,
    humidity: Number,
    temperature: Number,
    dewpoint: Number,
    date: { type: Date, default: Date.now },
    fireRisk: { type: Number, default: 0 },
});

module.exports = momngoose.model('Weather', wetherSchema)