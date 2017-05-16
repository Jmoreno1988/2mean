'use strict'

//Cargamos el esquema a utilizar 
var Task = require('../models/taskModel');
var Thematic = require('../models/thematicModel');
var User = require('../models/userModel');
var Token = require('../models/tokenModel');
// Token
var randtoken = require('rand-token');


function getAllUser(req, res) {
	User.find({}).exec((err, users) => {
		if (err) {
			res.status(500).send({
				message: "Error al leer datos"
			});
		} else {
			if (!users) {
				res.status(200).send({
					message: "No hay datos para leer"
				});
			} else {
				res.status(200).send({
					users: users
				});
			}
		}
	});
}

// login y recupera los datos de usuario
function getAllInfoUser(req, res) {
	try {
		var params = req.body;
		var user = params.user;
		var password = params.password;
		var idUser = req.params.idUser;
		var token;
		User.findOne({ name: user, password: password }).exec((err, user) => {
			if (err) {
				res.status(500).send({ err: err });
			} else {
				if (!user) {
					res.status(200).send({ message: "Error al consultar el usuario" });
				} else {
					var result = {}
					if (!user.token) {//genero token para ese usuario:
						console.log(" NO tiene token");
						var suid = randtoken.suid;
						token = suid(16);
						var newToken = new Token();
						newToken.token = token;
						newToken.userId = idUser;
						newToken.date = new Date();
						newToken.save((err, tokenStored) => {
							if (err) {
								res.status(500).send({ message: "Error al guardar token" });
							} if (!tokenStored) {
								res.status(200).send({ message: "Errorrrrrrrrrrrrrr token" });
							} else {
								console.log(tokenStored.token)
								console.log("token guardado");
								User.findByIdAndUpdate(user._id, { token: tokenStored.token }, (err, userUpdated) => {
									if (err) {
										res.status(500).send({
											message: "Error al actualizar "
										});
									} else {
										if (!userUpdated) {
											res.status(200).send({
												message: "No hay datos para actualizar"
											});
										} else {
											/*res.status(200).send({
												tokenStored: tokenStored
											});*/
										}
									}
								});

							}
						});
					} else {
						console.log("YA tiene token");
						//Ahora hay que ver la fecha del token y ver si la sesion está on.
					}


					Task.populate(user, { path: "tasks" }, (err, usersTask) => {
						if (err) {
						}
						Thematic.populate(user, { path: "thematic" }, (err, usersThematic) => {
							var userInfo = {
								id: usersThematic._id,
								userName: usersThematic.name,
								token: usersThematic.token,
								tasks: usersThematic.tasks,
								thematics: usersThematic.thematic
							}
							res.status(200).send(userInfo);
						});
					});
				}
			}
		});
	} catch (error) { Console.log("Error al obtener las tareas del usuario " + error) }
}


//Devuelve las tareas del usuario especificado por idUser"
function getTaskforUser(req, res) {
	try {
		var idUser = req.params.idUser || idUser;
		User.findOne({ _id: idUser }).exec((err, users) => {
			if (err) {
				res.status(500).send({ message: "Error al leer datos" });
			} else {
				if (!users) { res.status(200).send({ message: "ususario no encontrado" }) }
				else {
					Task.populate(users, { path: "tasks" }, (err, usersTask) => {
						if (err) {
						}
						res.status(200).send({ userTask: usersTask.tasks });
					});
				}
			}
		});
	} catch (error) { Console.log("Error al obtener las tareas del usuario " + error) }
}


function getThematicForUse(req, res) {
	try {
		var nameUser = req.params.name;
		User.find({ name: nameUser }, (err, user) => {
			if (err) {
				res.status(500).send({
					message: "Error al leer datos"
				});
			} else {
				if (!user) {
					res.status(200).send({
						message: "No hay datos para leer"
					});
				} else {
					res.status(200).send({
						thematic: user[0].thematic
					});
				}
			}
		});
	} catch (error) { Console.log("Error al obtener las tematicas del usuario " + error) }
}

/*Creamos un nuevo usuario. Pendiente asignar token... */
function saveUser(req, res) {
	var user = new User();
	var params = req.body;
	user.name = params.name;
	user.password = params.password;
	user.email = params.email;
	//antes de guardar compruebo que no tenga ya el tematico con el mismo titulo
	var isrepeat = false;
	try {
		User.find({ name: user.name }).exec((err, users) => {
			if (err) {
				res.status(500).send({
					message: "Error al leer datos"
				});
			} else {
				if (users) {
					if (users.length == 0) {
						user.save((err, userStored) => {
							if (err) {
								res.status(500).send({ messsage: 'Error en la petición' }, { user: null });
							} else {
								if (!userStored) {
									res.status(400).send({ message: 'No al guardar el usuario' }, { user: null });
								} else {
									res.status(200).send({ user: userStored });
								}
							}
						});
					} else {
						res.status(200).send({ message: "Ya existe ese nombre de usuario", user: null });
					}
				}
			}
		});
	} catch (error) {
		console.log("Error to save User: " + error);
	}

}

module.exports = {
	getAllUser,
	getAllInfoUser,
	getThematicForUse,
	getTaskforUser,
	saveUser
}