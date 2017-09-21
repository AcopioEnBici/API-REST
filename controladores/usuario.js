'use strict'

var Usuario = require('../modelos/usuario');
var bcrypt = require('bcrypt-nodejs');
var emailValidator = require('email-validator');
var jwt = require('../servicios/jwt');

function crear(req, res){
	var usuario = new Usuario();
	var params  = req.body;
	usuario.nombre = params.nombre;
	usuario.apellidos = params.apellidos;
	usuario.correo = params.correo.toLowerCase();
	usuario.privilegio = 'ROL_USUARIO';
	usuario.imagen = 'null';

	if(params.contrasena){
		bcrypt.hash(params.contrasena,null,null, function(err, hash){
			if(err){
				res.status(500).send({
					mensaje: 'Se produjo un error.'
				});
			}else{
				if(usuario.nombre != null && usuario.apellidos != null && usuario.correo != null){
					if(emailValidator.validate(usuario.correo)){
						//Se crea el usuario
						usuario.contrasena = hash;

						Usuario.findOne({correo:usuario.correo},(err,usuarioEncontrado) => {
							if(err){
								res.status(500).send({
									mensaje: 'Se produjo un error.'
								});
							}else{
								if(!usuarioEncontrado){
									usuario.save((err, usuarioCreado) => {
										if(err){
											res.status(500).send({
												mensaje: 'Se produjo un error.'
											});
										}else{
											if(usuarioCreado){
												res.status(200).send({
													usuario: usuarioEncontrado
												});
											}else{
												return res.status(404).send({
													mensaje: 'Se produjo un error.'
												});
											}
										}
									});
								}else{
									return res.status(200).send({
										mensaje: 'El usuario ya existe.'
									});
								}
							}
						});
					}else{
						res.status(200).send({
							mensaje: 'Correo electrónico inválido.'
						});
					}
				}
			}
		});
	}else{
		res.status(200).send({
			mensaje: 'Ingrese la contraseña'
		});
	}
}

function login(req, res){
	var params  = req.body;
	var correo  = params.correo.toLowerCase();
	var contrasena  = params.contrasena;

	if(emailValidator.validate(correo)){
		Usuario.findOne({correo: correo},(err, usuarioEncontrado) => {
			if(err){
				res.status(200).send({
					mensaje: 'Se produjo un error.'
				});
			}else{
				if(!usuarioEncontrado){
					res.status(404).send({
						mensaje: 'Usuario o contraseña incorrectos.'
					});
				}else{
					bcrypt.compare(contrasena, usuarioEncontrado.contrasena, (err, check) => {
						if(err){
							res.status(500).send({
								mensaje: 'Se produjo un error.'
							});
						}else{
							if(!check){
								res.status(200).send({
									mensaje: 'Usuario o contraseña incorrectos.'
								});
							}else{
								if(params.gethash){
									res.status(200).send({
										token: jwt.createToken(usuarioEncontrado)
									});
								}else{
									res.status(200).send({
										usuarioEncontrado
									});
								}
							}
						}
					});
				}
			}
		});
	}else{
		res.status(200).send({
			mensaje: 'Correo electrónico inválido.'
		});
	}
}

function actualizar(req, res){
	var idUsuario = req.params.id;
	var update = req.body;
	if(idUsuario  != req.usuario.sub){
		res.status(403).send({
			mensaje: 'Prohibido'
		});
	}else{
		Usuario.findByIdAndUpdate(idUsuario,update, (err, usuarioActualizado) => {
			if(err){
				res.status(500).send({
					mensaje: 'Error al actualizar al usuario.'
				});
			}else{
				if(!usuarioActualizado){
					res.status(404).send({
						mensaje: 'Usuario no encontrado.'
					});
				}else{
					res.status(200).send({
						usuarioActualizado
					});
				}
			}
		});
	}


}

function subirImagen(req, res){
	var usuarioId = req.params.id;
	var nombreArchivo = 'Sin imagen';
	if(req.files){
	  var file_path = req.files.image.path;
	  var file_split = file_path.split('\\');
	  var file_name = file_split[2];

	  var ext_split = file_name.split('\.');
	  var file_ext = ext_split[1];

	  if(file_ext  == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
	    Usuario.findByIdAndUpdate(usuarioId,{imagen: file_name}, (err, usuarioActualizado) => {
	      if(!usuarioActualizado){
	        res.status(404).send({
	          message: "El usuario no existe."
	        });
	      }else{
	        res.status(200).send({
	          image: file_name,
	          usuario: usuarioActualizado
	        });
	      }
	    });
	  }else{
	    res.status(200).send({
	      message: 'Archivo inválido.'
	    });
	  }
	}else{
	  res.status(200).send({
	    message: 'No se subio la imagen.'
	  });
	}
}

function obtenerImagen(req, res){
	var imageFile = req.params.imagen;
	var path_file = './uploads/usuarios/' + imageFile;

	fs.exists(path_file, function(exists){
	  if(exists){
	    res.sendFile(path.resolve(path_file));
	  }else{
	    res.status(404).send({
	      message: 'La imagen no existe..'
	    });
	  }
	});
}

function obtenerUsuarios(req, res){
	var usuarioId = req.body.id;

	if(id){
		Usuario.findById(usuarioId,(err, usuario) => {
			if(err){
				res.status(500).send({
					mensaje: 'Se produjo un error.'
				});
			}else{
				if(!usuario){
					res.status(404).send({
						mensaje: 'Usuario no encontrado.'
					});
				}else{
					res.status(200).send({
						usuario
					});
				}
			}
		});
	}else{
		Usuario.find().sort('nombres').exec((err, usuarios) => {
			if(err){
				res.status(500).send({
					mensaje: 'Se produjo un error.'
				});
			}else{
				res.status(200).send({
					usuarios
				});
			}
		});
	}
}

module.exports = {
	crear,
	login,
	actualizar,
	subirImagen,
	obtenerImagen,
	obtenerUsuarios
};