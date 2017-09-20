'use strict'

var Usuario = require('../modelos/usuario');
var bcrypt = require('bcrypt-nodejs');
//var jwt = require('../services/jwt');

function crearUsuario(req, res){
	res.status(200).send({
		mensaje: 'Funciona!'
	});
}

module.exports = {
	crearUsuario
};