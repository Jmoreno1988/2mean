'use strict'

//Cargamos elesquema a utilizar 
var Task = require('../models/taskModel');

function test(req, res) {
	console.log("estoy en test");
	var user;
	if (req.params.user) {
		user = req.params.user
	} else {
		user = "No User";
	}

	res.status(200).send({
		message: "Hola desde Controller: " + user
	});
}

function test2(req, res) {
	console.log("estoy en test2");


	res.status(200).send({
		message: "Hola 222222: "
	});
}


function getAllTask(req, res) {
	//para devolver toda la colección ordenada por url
	console.log("estoy en getAllTask");
	Task.find({}).exec((err, tasks) => {
		if (err) {
			res.status(500).send({
				message: "Error al leer datos"
			});
		} else {
			if (!tasks) {
				res.status(200).send({
					message: "No hay datos para leer"
				});
			} else {
				res.status(200).send({
					tasks: tasks
				});
			}
		}
	});
}

//Se pasan los parametros por el body
function saveTask(req, res) {
	var params = req.body;
	var task = new Task();
	task.title = params.title;
	task.description = params.description;
	task.priority = params.priority;
	task.date = new Date();
	task.save((err, taskStored) => {
		if (err) {
			res.status(500).send({
				message: "Error al guardar datos"
			});
		} else {
			res.status(200).send({
				task: taskStored
			});
		}
	});

}

function getTask(req, res) {
	var taskId = req.params.id;
	Task.find({ _id: taskId }, (err, task) => {
		if (err) {
			res.status(500).send({
				message: "Error al leer datos"
			});
		} else {
			if (!task) {
				res.status(200).send({
					message: "No hay datos para leer"
				});
			} else {
				res.status(200).send({
					task: task
					//favorite : favorites
				});
			}
		}
	});
}


function updateTask(req, res) {
	var taskId = req.params.id;
	var update = req.body;
	console.log("Estoy en update");
	console.log(update);
	Task.findByIdAndUpdate(taskId, update, (err, taskUpdated) => {
		if (err) {
			res.status(500).send({
				message: "Error al actualizar "
			});
		} else {
			if (!taskUpdated) {
				res.status(200).send({
					message: "No hay datos para actualizar"
				});
			} else {
				res.status(200).send({
					task: taskUpdated
				});
			}
		}
	});

}

function deleteTask(req, res) {
	var taskId = req.params.id;
	Task.findById(taskId, (err, task) => {
		if (err) {
			res.status(500).send({
				message: "Error al borrar "
			});
		} else {
			if (!task) {
				res.status(200).send({
					message: "No hay datos para borrar"
				});
			} else {
				task.remove()
				res.status(200).send({
					message: "Tarea con id: " + taskId + " eliminada"
				});
			}
		};

	});
}

function upPriority(req, res) {
	var taskId = req.params.id;
	Task.findById(taskId, (err, task) => {
		if (err) {
			res.status(500).send({
				message: "Error al borrar "
			});
		} else {
			if (!fav) {
				res.status(200).send({
					message: "No hay datos para borrar"
				});
			} else {
				if (task.priority && (task <= 1 || task > 3)) {
					console.log("updateeeee " + task.priority);
				} res.status(200).send({
					message: "upPriority id: " + taskId + ""
				});
			}
		};

	});
}

module.exports = {
	test,
	test2,
	getAllTask,
	saveTask,
	getTask,
	updateTask,
	deleteTask
}