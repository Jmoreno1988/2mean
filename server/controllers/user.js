'use strict'

//Cargamos el esquema a utilizar 
var Task = require('../models/taskModel');
var Thematic = require('../models/thematicModel');
var User = require('../models/userModel');
var Token = require('../models/tokenModel');
// Token
var randtoken = require('rand-token');

var timeToken = 10 // Segundos;


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

function generaToken() {
	var suid = randtoken.suid;
	var token = suid(16);
	var newToken = new Token();
	newToken.token = token;
	newToken.date = new Date();
	return newToken;
}

// login y recupera los datos de usuario
function getAllInfoUser(req, res) {
	try {
		var params = req.body;
		var user = params.name;
		var password = params.password;
		var idUser = req.params.idUser;

		User.findOne({ name: user, password: password }).exec((err, user) => {
			if (err) {
				res.status(500).send({ err: err });
			} else {
				if (!user) {
					res.status(200).send({ message: "Error al consultar el usuario" });
				} else {
					var result = {}
					if (!user.token) {//genero token para ese usuario:
						console.log("El usuario no tiene token")
						var newToken = generaToken();
						newToken.userId = idUser;
						try {
							newToken.save((err, tokenStored) => {


								try {
									User.findByIdAndUpdate(user._id, { token: tokenStored.token }, (err, userUpdated) => {

										console.log("token guardado");

										Task.populate(userUpdated, { path: "tasks" }, (err, usersTask) => {
											if (err) {
											}
											Thematic.populate(userUpdated, { path: "thematic" }, (err, usersThematic) => {
												var userInfo = {
													id: usersThematic._id,
													userName: usersThematic.name,
													token: tokenStored.token,
													tasks: usersThematic.tasks,
													thematics: usersThematic.thematic
												}
												res.status(200).send({ nuevoToken: userInfo });
											});
										});


									});
								} catch (error) {
									console.log("Error al guardar Token" + error);
								}
							});
						} catch (error) {
							console.log("Error al guardar Token" + error);
						}



					} else {
						console.log("YA tiene token " + user.token);
						//Ahora hay que ver la fecha del token y ver si la sesion está on.
						var durationToken = timeToken
						var currentDate = new Date();
						Token.findOne({ token: user.token }, (err, tokenUser) => {
							console.log(tokenUser);
							var a = (tokenUser.date);
							var b = (currentDate);
							console.log((b - a) / 1000);
							if ((b - a) / 1000 < durationToken) {
								console.log("sesion ok");
								Token.findOneAndUpdate({ userId: user._id }, { date: currentDate }, (err, tokenUpdated) => {
									if (err) {
										res.status(500).send({
											message: "Error al consultar usuario en token"
										});
									} else {
										if (!tokenUpdated) {
											res.status(200).send({
												message: "No hay datos tokenUpdated"
											});
										} else {
											console.log("fecha actualizada" + tokenUpdated.date);
											console.log(user.token)
											User.findByIdAndUpdate(user._id, { token: user.token }, (err, userUpdatedToken) => {
												Task.populate(userUpdatedToken, { path: "tasks" }, (err, usersTask) => {
													if (err) {
													}
													Thematic.populate(userUpdatedToken, { path: "thematic" }, (err, usersThematic) => {
														var userInfo = {
															id: user._id,
															userName: user.name,
															token: userUpdatedToken.token,
															tasks: usersThematic.tasks,
															thematics: usersThematic.thematic
														}
														res.status(200).send({ tokenActualizado: userInfo });
													});
												});
											});
										}
									}
								});
							} else {
								console.log("sesion expirada");
								Token.findOneAndUpdate({ userId: user._id }, { token: null }, (err, tokenUpdated) => {
									if (err) {
										res.status(500).send({
											message: "Error al consultar usuario en token"
										});

									} else {
										if (!tokenUpdated) {
											res.status(200).send({
												message: "No hay datos tokenUpdated"
											});
										} else {
											User.findOneAndUpdate({ userId: idUser }, { token: null }, (err, userUpdated) => {

												Task.populate(userUpdated, { path: "tasks" }, (err, usersTask) => {
													if (err) {
													}
													Thematic.populate(userUpdated, { path: "thematic" }, (err, usersThematic) => {
														var userInfo = {
															id: usersThematic._id,
															userName: usersThematic.name,
															token: null
														}
														res.status(200).send({ tokenCaducado: userInfo });
													});
												});
											});
											//console.log("token reseteado" + tokenUpdated.token);
										}
										console.log("borrado TOKEN");

									}
								});
							}

						});
					}
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
	//antes de guardar compruebo que no exista un usuario con el mismo nombre o email.
	var params = req.body;
	User.find({ $or: [{ name: params.name }, { email: params.email }] }).exec((err, users) => {
		if (err) {
			res.status(500).send({
				message: "Error al leer datos"
			});
		} else {
			if (users.length == 0) {
				var user = new User();
				user.name = params.name;
				user.password = params.password;
				user.email = params.email;
				user.save((err, userStored) => {
					if (err) {
						res.status(500).send({ messsage: 'Error al guardar' }, { user: null });
					} else {
						if (!userStored) {
							res.status(400).send({ message: 'No se ha guardado' });
						} else {
							res.status(200).send({ user: userStored });
						}
					}
				});
			} else {
				res.status(200).send({ message: "Ya existe ese nombre de usuario o ese email", user: null });
			}
		}
	});
}

module.exports = {
	getAllUser,
	getAllInfoUser,
	getThematicForUse,
	getTaskforUser,
	saveUser
}