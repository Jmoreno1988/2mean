'use strict'

//import {CryptoJS} from '../../client/app/components/encrypt.component';

//Cargamos el esquema a utilizar 
var Task = require('../models/taskModel');
var Thematic = require('../models/thematicModel');
var User = require('../models/userModel');
var Token = require('../models/tokenModel');
// Token
var randtoken = require('rand-token');
var timeToken = 20 // Segundos;
//var CryptoJS = require("crypto-js");

/*Creamos un nuevo usuario.*/
function createUser(req, res) {
	console.log("*******************************************");
	console.log("createUser");
	console.log(req.body)
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

	var params = req.body;
	var user = params.user;
	var hash = params.password;


	User.findOne({ name: user, password: hash }).exec((err, user) => {
		if (err) {
			res.status(500).send({ err: err });
		} else {
			if (!user) {
				res.status(200).send({ message: "Error al consultar el usuario", user: null });
			} else {
				var result = {}
				if (!user.token) {//genero token para ese usuario:
					console.log("El usuario no tiene token")
					var newToken = generaToken();
					newToken.userId = user._id;
					try {
						newToken.save((err, tokenStored) => {
							if (err) {
								res.status(500).send({ messsage: 'Error al guardar token' }, { token: null });
							} else {
								if (!tokenStored) {
									res.status(400).send({ message: 'No se ha guardado token' }, { token: null });
								} else {
									console.log(tokenStored.userId);
								}
							}
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
												thematics: usersThematic.thematic,
												message: "token asignado"
											}
											res.status(200).send({userInfo });
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
					var durationToken = timeToken;
					var currentDate = new Date();
					Token.findOne({ token: user.token }, (err, tokenUser) => {
						console.log("recupero el token");
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
														thematics: usersThematic.thematic,
														message:"token actualizado"
													}
													res.status(200).send({userInfo});
												});
											});
										});
									}
								}
							});
						} else {
							console.log("sesion expirada");
							Token.remove({ token: user.token }, (err, tokenUpdated) => {
								//Token.findOneAndUpdate({ userId: user._id }, { token: null }, (err, tokenUpdated) => {
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
										User.findByIdAndUpdate(user._id, { $set: { token: null } }, (err, userExpired) => {
											if (err) {
												res.status(500).send({ messsage: 'Error borrar token de usuario' }, { token: null });
											} else {
												if (!userExpired) {
													res.status(400).send({ message: 'No se ha actualizado usuario' }, { token: null });
												} else {
													userExpired.token = null;
													userExpired.message = "sesion expirada";
													res.status(200).send({userExpired });
												}
											}
										});
									}

								}
							});
						}

					});
				}
			}
		}
	});
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



function checkSession(req, res) {
	var idUser = req.params.id;

	User.findById(idUser, (err, user) => {
		if (err) {
			res.status(500).send({
				token: "error"
			});
		}

		if (!user || !user.token) {
			res.status(200).send({
				token: null
			});
		} else {
			console.log("Ususario con token " + user.token);
			//Ahora hay que ver la fecha del token y ver si la sesion está on.
			var durationToken = timeToken;
			var currentDate = new Date();
			Token.findOne({ token: user.token }, (err, tokenUser) => {
				console.log("recupero el token");
				console.log(tokenUser);
				if (!tokenUser) {
					return true;
				}
				var a = (tokenUser.date);
				var b = (currentDate);
				console.log((b - a) / 1000);

				if ((b - a) / 1000 < durationToken) {
					console.log("sesion ok: actualizo la fecha del token");
					Token.findOneAndUpdate({ userId: user._id }, { date: currentDate }, (err, tokenUpdated) => {
						if (err || !tokenUpdated) {
							console.log("error al actualizar fecha del token");
							res.status(200).send({
								token: "error"
							});
						} else {
							console.log("fecha actualizada" + tokenUpdated.date);
							res.status(200).send({
								token: tokenUpdated.token
							});
						}
					});
				} else {
					console.log("sesion expirada");

					Token.remove({ token: user.token }, (err, tokenUpdated) => {
						if (err || !tokenUpdated) {
							console.log("error al borrar token expirado");
						}
						User.findByIdAndUpdate(user._id, { $set: { token: null } }, (err, userExpired) => {
							if (err || !userExpired) {
								console.log("error al actualizar a null el token expirado")
								res.status(200).send({
								token: "Error"
							});
							} else {
								userExpired.token = null;
								res.status(200).send({
								token: userExpired.token
							});
							}
						});
					});
					return true;
				}

			});
		}
	});
}



module.exports = {
	getAllUser,
	getAllInfoUser,
	getThematicForUse,
	getTaskforUser,
	createUser,
	checkSession
}