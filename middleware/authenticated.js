'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var env = require('../env.json');
var secret = env.API.SECRETKEY;

function ensureAuth(req, res, next){

   if(!req.headers.authorization){
    return res.status(403).send({
      message: 'La solicitud no contiene las cabeceras requeridas.'
    });
  }

  var token = req.headers.authorization.replace(/['"]+/g, '');

  try{
    var payload = jwt.decode(token, secret);

    if(payload.exp <= moment().unix()){
      return res.status(401).send({
        message: 'El token ha expirado.'
      });
    }
  }catch(err){
    return res.status(404).send({
      message: 'Token inválido.'
    });
  }

  req.usuario = payload;

  next();

}

function esAdmin(req, res, next){

  let privilegio = req.usuario.privilegio;

  if(privilegio === "ROL_ADMIN"){
    next();
  }else{
    return res.status(403).send({
      mensaje: "Prohibido"
    });
  }

}

module.exports = {
  ensureAuth,
  esAdmin
};
