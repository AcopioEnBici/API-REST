'use strict'

var express = require('express');
var UsuarioControlador = require('../controladores/usuario');
//var md_auth = require('../middleware/authenticated');
var api = express.Router();
var multipart = require('connect-multiparty');

api.get('/usuario/registro',UsuarioControlador.crearUsuario);



module.exports = api;
