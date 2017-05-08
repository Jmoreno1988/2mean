'use strict'

//Cargamos elesquema a utilizar 
var Task = require('../models/taskModel');
var Thematic = require('../models/thematicModel');
var User = require('../models/userModel');

function testUser(req, res) {
	res.status(200).send(
		{
			message: 'Probando 123 siiiiiiii'
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

function getAllInfoUser(req, res) {
	var idUser = req.params.idUser;
	User.findById({ _id: idUser }).exec((err, user) => {
		if (err) {
			res.status(500).send({ err: err });
		} else {
			if (!user) {
				res.status(200).send({ message: "No hay datos para leer" });
			} else {
				var result = {"user":idUser, "tasks":[], "thematic": []}
				Task.populate(user, { path: "tasks" }, (err, usersTask) => {
					if (err) {
					}
					result.tasks = usersTask.tasks;
					
				});
				Thematic.populate(user, { path: "thematic" }, (err, usersThematic) => {
					if (err) {
					}
					result.thematic = usersThematic;
					
				});
				res.status(200).send({ result: result });
				console.log(result);
			}
		}
	});
}


//Devuelve las tareas del usuario especificado por idUser"
function getTaskforUser(req, res) {
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
}


function getThematicForUse(req, res) {
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
}

function saveUser(req, res) {
	var user = new User();
	var params = req.body;
	user.name = params.name;
	user.password = params.password;
	//antes de guardar compruebo que no tenga ya el tematico con el mismo titulo
	var isrepeat = false;
	User.findOne({}).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: "Error al leer datos" });
		} else {
			if (!user) {
				res.status(200).send({ message: "No hay datos para leer" });
			} else {
				for (var i = 0; i < user.length; i++) {
					if (params.name === user.name) {
						isrepeat = true;
						res.status(200).send({ message: "Ya existe ese nombre de usuario", user: null });
						break;
					}
				}
				if (!isrepeat) {
					user.save((err, userStored) => {
						if (err) {
							res.status(500).send({ messsage: 'Error en la petición' });
						} else {
							if (!userStored) {
								res.status(400).send({ message: 'No se ha guardado la imagen' });
							} else {
								res.status(200).send({ user: userStored });
							}
						}
					});
				}
			}
		}
	});

}




module.exports = {
	testUser,
	getAllUser,
	getAllInfoUser,
	getThematicForUse,
	getTaskforUser,
	saveUser

}