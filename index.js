'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;
var dbUrl = '127.0.0.1';

mongoose.connect('mongodb://' + dbUrl + ':27017/acopio-en-bici',{useMongoClient: true},(err, res) => {
  if(err){
    throw err;
  }else{
    console.log("Conexión a la base de datos establecida correctamente.");

    app.listen(port, function(){
        console.log('API REST escuchando en http://127.0.0.1:' + port);
    });
  }
});