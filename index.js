'use strict'

var mongoose = require('mongoose');
var env = require('./env.json');
var app = require('./app');
var apiUrl = env.API.URL || '127.0.0.1';
var apiPort = env.API.PORT || 3977;
var dbUrl = env.DB.URL || '127.0.0.1';
var dbPort = env.DB.PORT || 27017;
var dbName = env.DB.NAME;

mongoose.connect('mongodb://' + dbUrl + ':'+ dbPort +'/'+ dbName,{useMongoClient: true},(err, res) => {
  if(err){
    throw err;
  }else{
    console.log("Conexión a la base de datos establecida correctamente.");

    app.listen(apiPort,apiUrl, function(){
        console.log('API REST escuchando en http://'+apiUrl+':' + apiPort);
    });
  }
});