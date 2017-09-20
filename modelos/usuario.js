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


module.exports = mongoose.model('Usuario', UsuarioSchema);
