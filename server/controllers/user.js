'use strict'

//Cargamos el esquema a utilizar 
var Task = require('../models/taskModel');
var Thematic = require('../models/thematicModel');
var User = require('../models/userModel');


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


function getAllInfoUser(req, res) {
	try {
	var params = req.body;
	var user = params.user;
	var password = params.password;	
	var idUser = req.params.idUser;
	User.findOne({ name: user, password:password }).exec((err, user) => {
		if (err) {
			res.status(500).send({ err: err });
		} else {
			if (!user) {
				res.status(200).send({ message: "Error al consultar el usuario" });
			} else {
				var result = {}
				Task.populate(user, { path: "tasks" }, (err, usersTask) => {
					if (err) {
					}
					Thematic.populate(user, { path: "thematic" }, (err, usersThematic) => {
						var userLogaded = {
							id: usersThematic._id,
							userName: usersThematic.name,
							tasks:usersThematic.tasks,
							thematics:usersThematic.thematic
						}
						res.status(200).send(userLogaded);
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