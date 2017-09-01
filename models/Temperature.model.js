'use strict';

var momngoose  = require('mongoose');
const Schema     = momngoose.Schema;



const tempSchema = new Schema({
    temperature: Number,
    date: { type: Date, default: Date.now },
});

module.exports = momngoose.model('Temperature', tempSchema)