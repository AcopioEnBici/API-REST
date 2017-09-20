'use strict'

var express  = require('express');
var bodyParser = require('body-parser');

var app = express();
const prefijoUrl = '/acopioenbici/api/v1/';

var rutas_usuario = require('./rutas/usuario');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
	res.header('Allow', 'POST, GET, OPTIONS, PUT, DELETE');

	next();
});

app.use(prefijoUrl, rutas_usuario);

module.exports = app;