'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var env = require('../env.json');
var secret = env.API.SECRETKEY;

exports.createToken = function(user){
  var payload = {
    _id: user._id,
    nombre: user.nombres,
    apellidos: user.apellidos,
    correo: user.correo,
    privilegio: user.privilegio,
    imagen: usuario.imagen,
    iat: moment().unix(),
    exp: moment().add(30,'days').unix()
  };

  return jwt.encode(payload, secret);
};
