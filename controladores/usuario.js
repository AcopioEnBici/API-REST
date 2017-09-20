'use strict'

var Usuario = require('../modelos/usuario');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../servicios/jwt');

function crear(req, res){
	res.status(200).send({
		mensaje: 'Funciona!'
	});
}

function login(req, res){

}

function actualizar(req, res){

}

function subirImagen(req, res){

}

function obtenerImagen(req, res){

}

function obtenerUsuarios(req, res){

}

module.exports = {
	crear,
	login,
	actualizar,
	subirImagen,
	obtenerImagen,
	obtenerUsuarios
};