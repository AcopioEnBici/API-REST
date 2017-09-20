'use strict'

var express = require('express');
var UsuarioControlador = require('../controladores/usuario');
var md_auth = require('../middleware/authenticated');
var api = express.Router();
var multipart = require('connect-multiparty');

api.post('/usuario/registro',UsuarioControlador.crear);
api.post('/usuario/login',UsuarioControlador.login);
api.get('/usuarios/:id?',[md_auth.ensureAuth,md_auth.esAdmin], UsuarioControlador.obtenerUsuarios);
api.patch('/usuarios/:id',md_auth.ensureAuth, UsuarioControlador.actualizar);
api.post('/usuarios/subirImagen/',md_auth.ensureAuth, UsuarioControlador.subirImagen);
api.get('/usuarios/obtenerImagen/',md_auth.ensureAuth, UsuarioControlador.obtenerImagen);




module.exports = api;
