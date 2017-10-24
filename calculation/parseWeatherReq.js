"use strict";
const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Weather = require("../models/fire_risk-data-model"),
    Temperature = require("../models/Temperature.model"),
    cron = require('node-cron'),
    //ajax = require("node.ajax"),
    port = 3000,
    request = require('request'),
    axios   = require('axios'),
    K_wind = require("./windCoeficient"),
    K_pertisipation = require("./patisipationCoeficient"),
    F_risk_calc = require("./fireRiskCalculation"),
   

    CITY = 'zhytomyr',

    url = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=541bc45586c376137568151a5f67bafe', // http://www.mysite.ru/index.php
    url2 = `http://api.wunderground.com/api/f39cd86830e4de9e/conditions/q/ua/${CITY}.json`;
  /*   let answer = {},
        tempC, humidity, wind; */


      // var parseWeather = cron.schedule('* * * * * *', function(){
      // var url2 = 'http://api.wunderground.com/api/f39cd86830e4de9e/conditions/q/ua/zhytomyr.json';
      //        request({
      //       method: 'GET',
      //       url: url2,
      //       // параметры GET-запроса
      //       // index.php?param=edit&value=10
      //       qs: {
      //         param: 'edit',
      //         value: 100
      //       }
      //      }, function (error, response, body) {
      //      if (!error && response.statusCode == 200) {
      //        // console.log(body);
      //        // валидация и 
      //        // обработка полученного ответа, заголовков
      //        answer = JSON.parse(body);
      //       //  tempC = answer.main["temp"];
      //       //  humidity = answer.main["humidity"];
      //       //  wind = answer.wind["speed"]; 
      //      }
      //    })
         
      //    console.log(answer);
      //       /*  console.log("***Погода в Лондоне***"); 
      //        console.log("Температура воздуха: " + tempC);
      //        console.log("Влажность, %: " + humidity);
      //        console.log("Скоростть ветра, м/с: " + wind); */
      //    }); 



//Set cron task to start this requests loop on  11:00  everyday:
//const  parseWeather = cron.schedule(' 11 * * *', function(){});
//   var parseWeather = cron.schedule('*/4 * * * * *', function(){
  var parseWeather = cron.schedule('* * * * *', function(){

    
          var url2 = 'http://api.wunderground.com/api/f39cd86830e4de9e/conditions/q/ua/zhytomyr.json';

          // Рядком нижче необхідно заключити код в цикл який буде шукати міста в масиві даних і встроювати їх в url2, після чого писати в базу даних.
           axios.get(url2)
          .then(function (response) {
            //відразу отримавши дані слід провести розрахунок пожежного ризику і додати до документу бази даних на льоту у змінну
            // змінну додати разом із погодними змінними до об'єкту і всі їх разом записати в новий документ, який зберегти у коллекцію.
            
            let temperature, district, perticipetion, humidity, dewpoint, windSpeed, setFireRisk;
            

            temperature   = response.data.current_observation.temp_c;
            district      = response.data.current_observation.display_location.city;
            perticipetion = response.data.current_observation.precip_today_metric;
            humidity      = response.data.current_observation.temp_c;
            dewpoint      = response.data.current_observation.dewpoint_c;
            windSpeed     = response.data.current_observation.wind_kph;

            
            console.log('Відповідь стороннього сервера з даними щодо погоди насьогодні');

            //windSpeed, perticipetion, T, d
             setFireRisk = F_risk_calc.fireRiskCalculation(windSpeed, perticipetion, temperature, dewpoint);
            console.log('8888 Hello from weather API setFireRisk at the moment: 8888' +  setFireRisk);
           // console.log(`It's currently ${temperature}.`);
           


            function saveCurrentWeather() {

//Create a document from Weather Schema
let currentWeather = new Weather();
currentWeather.temperature    = temperature;
currentWeather.district       = district;
currentWeather.perticipetion  = perticipetion;
currentWeather.humidity       = humidity;
currentWeather.dewpoint       = dewpoint;
currentWeather.windSpeed      = (windSpeed * 1000) / 3600;  // швидкість вітру в метрах за секунду
currentWeather.fireRisk      = setFireRisk;


              currentWeather.save(function(err, weather){
                if (err) {console.log('ERRROR!!!!');} else {
                    console.log("В базу даних йде це" + weather);
                }
                
                   }) // end current weather save
            }
            
            setTimeout(saveCurrentWeather, 2000);





          })
          .catch(function (error) {
            console.log(error);
          }); 
       
          
       }); 
 

         module.exports = parseWeather;