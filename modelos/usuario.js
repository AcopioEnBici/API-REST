'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
  nombres: String,
  apellidos: String,
  correo: String,
  imagen: String, 
  contrasena: String,
  privilegio: String
});

/**
	Roles de usuario

	ROL_USUARIO -- POR DEFECTO
	ROL_ADMIN
	ROL_MENSAJERO
**/

module.exports = mongoose.model('Usuario', UsuarioSchema);
