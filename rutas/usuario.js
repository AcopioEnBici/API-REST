'use strict'

var express = require('express');
var UsuarioControlador = require('../controladores/usuario');
var md_auth = require('../middleware/authenticated');
var api = express.Router();
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/usuarios'});

api.post('/usuario/registro',UsuarioControlador.crear);
api.post('/usuario/login',UsuarioControlador.login);
api.get('/usuarios/:id?',[md_auth.ensureAuth,md_auth.esAdmin], UsuarioControlador.obtenerUsuarios);
api.patch('/usuarios/:id',md_auth.ensureAuth, UsuarioControlador.actualizar);
api.post('/usuarios/subirImagen/:id',[md_auth.ensureAuth, md_upload], UsuarioControlador.subirImagen);
api.get('/usuarios/obtenerImagen/:imagen',md_auth.ensureAuth, UsuarioControlador.obtenerImagen);




module.exports = api;
