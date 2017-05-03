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
	var task = new Task(getTaskbyId(taskId, res));

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
				});
				return task;
			}
		}
	});
}


function updateTask(req, res) {
	var taskId = req.params.id;
	var update = req.body;
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
				message: "Error al buscar por id "
			});
		} else {
			if (!task) {
				res.status(200).send({
					message: "No se encuentra el elemento con ese id"
				});
			} else {
				if (task.priority && (task.priority >= 1 && task.priority < 3)) {
					var up = { priority: task.priority + 1 }
					Task.findByIdAndUpdate(task, up, (err, taskUpdated) => {
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

				} res.status(200).send({
					message: "ya tiene asignada la máxima prioridad " + task.priority + "!"
				});
			}
		};

	});
}

function downPriority(req, res) {
	var taskId = req.params.id;
	Task.findById(taskId, (err, task) => {
		if (err) {
			res.status(500).send({
				message: "Error al buscar por id "
			});
		} else {
			if (!task) {
				res.status(200).send({
					message: "No se encuentra el elemento con ese id"
				});
			} else {
				if (task.priority && (task.priority <= 3 && task.priority > 1)) {
					var up = { priority: task.priority - 1 };
					Task.findByIdAndUpdate(task, up, (err, taskUpdated) => {
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

				} else {
					res.status(200).send({
						message: "ya tiene asignada la mínima prioridad " + task.priority + "!"
					});
				}
			}
		};

	});
}

function filterByPriority(req, res) {
	var priority = req.params.priority;
	Task.find({ "priority": priority }).exec((err, task) => {
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
				});
			}
		}
	});
}


function prueba() {
	Task.find({}).exec((err, tasks) => {
		//console.log(tasks);
	});

	Task.find({ "priority": 2 }).exec((err, tasks2) => {
		console.log(tasks2);
	});
}




module.exports = {
	test,
	test2,
	getAllTask,
	saveTask,
	getTask,
	updateTask,
	deleteTask,
	upPriority,
	downPriority,
	prueba,
	filterByPriority
}