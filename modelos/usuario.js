'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
  nombre: String,
  apellidos: String,
  correo: String,
  contrasena: String,
  privilegio: String
});


module.exports = mongoose.model('Usuario', UsuarioSchema);
