"use strict"
const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Weather = require("./models/fire_risk-data-model"),
    Temperature = require("./models/Temperature.model"),
    cron = require('node-cron'),
    //ajax = require("node.ajax"),
    port = 3000,
    request = require('request'),
    axios   = require('axios'),
   
   
    url = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=541bc45586c376137568151a5f67bafe'; // http://www.mysite.ru/index.php
    let answer = {},
        tempC, humidity, wind;


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


        /*  var parseWeather = cron.schedule('* * * * * *', function(){
          
          axios.get(url)
          .then(function (response) {
            //відразу отримавши дані слід провести розрахунок пожежного ризику і додати до документу бази даних на льоту у змінну
            // змінну додати разом із погодними змінними до об'єкту і всі їх разом записати в новий документ, який зберегти у коллекцію.
             let tempC = response.data.main["temp"];
             let somedata = response.data;
             
            console.log(`It's currently ${tempC}.`);

            let tempData = new Temperature();
            tempData.temperature = tempC;
         
            tempData.save(function(err, temperature){
         if (err) {console.log('ERRROR!!!!');} else {
             console.log(temperature);
             
         }
         
            })




          })
          .catch(function (error) {
            console.log(error);
          });
       
           
          
       }); 
 */


  var parseWeather = cron.schedule('* * * * * *', function(){
          var url2 = 'http://api.wunderground.com/api/f39cd86830e4de9e/conditions/q/ua/zhytomyr.json';
          axios.get(url2)
          .then(function (response) {
            //відразу отримавши дані слід провести розрахунок пожежного ризику і додати до документу бази даних на льоту у змінну
            // змінну додати разом із погодними змінними до об'єкту і всі їх разом записати в новий документ, який зберегти у коллекцію.
            
            let temperature, district, perticipetion, humidity, dewpoint;
            

            temperature = response.data.current_observation.temp_c;
            district = response.data.current_observation.display_location.city;
            perticipetion = response.data.current_observation.precip_today_metric;
            humidity = response.data.current_observation.temp_c;
            dewpoint = response.data.current_observation.dewpoint_c;
           

            
            console.log(`It's currently ${temperature}.`);

//Create a document from Weather Schema
            let currentWeather = new Weather();
            currentWeather.temperature    = temperature;
            currentWeather.district       = district;
            currentWeather.perticipetion  = perticipetion;
            currentWeather.humidity       = humidity;
            currentWeather.dewpoint       = dewpoint;
         
            currentWeather.save(function(err, weather){
         if (err) {console.log('ERRROR!!!!');} else {
             console.log(weather);
             
         }
         
            })




          })
          .catch(function (error) {
            console.log(error);
          });
       
           
          
       }); 
 

         module.exports = parseWeather;