'use strict';
// Це тестова схема для перевірки правильності надсилання запитів до сторонніх ресурсів
var momngoose  = require('mongoose');
const Schema     = momngoose.Schema;



const tempSchema = new Schema({
    temperature: Number,
    date: { type: Date, default: Date.now },
});

module.exports = momngoose.model('Temperature', tempSchema)