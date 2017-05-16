'use strict'

//Cargamos elesquema a utilizar 
var Task = require('../models/taskModel');
var Thematic = require('../models/thematicModel');
var User = require('../models/userModel');

//Se pasan los parametros por el body
function createTask(req, res) {

	var params = req.body;
	var task = new Task();
	var user = new User();
	task.title = params.title;
	task.description = params.description;
	task.priority = params.priority;
	task.date = new Date();
	task.userId = params.userId;
	task.thematicId = params.thematicId || null;

	//antes de guardar compruebo que ese usuario no tenga ya la tarea con el mismo titulo
	//var isrepeat = false;
	try {
		Task.find({ title: task.title }, { userId: task.userId }).exec((err, tasks) => {
			if (err) {
				res.status(500).send({ message: "Error al leer datos" });
			} else {
				if (!tasks) {
					res.status(200).send({ message: "No hay datos para leer" });
				} else if (tasks.length > 0) {
					res.status(200).send({ message: "El usuario ya tiene una tarea con ese titulo", tasks: null });
				} else {
					task.save((err, taskStored) => {
						if (err) {
							res.status(500).send({ messsage: 'Error en la petición' });
						} else {
							if (!taskStored) {
								res.status(400).send({ message: 'No se ha guardado la imagen' });
							} else {
								// Actualizo la tabla de usuarios asignandole la nueva tarea.
								var idUser = params.userId;
								User.findByIdAndUpdate(idUser, { $push: { tasks: taskStored._id } }, (err, userUpdated) => {
									if (err) {
										res.status(500).send({
											message: "Error al guardar datos"
										});
									} else {
										if (!userUpdated) {//Guardo el usuario de la tarea
											res.status(200).send({
												message: "Error al guardar la tarea para el usuario activo"
											});
										}
										//Continuo y actualizo la tabla de tematicas asignandole la nueva tarea.
										var idThematic = params.thematicId
										if (idThematic) {
											Thematic.findByIdAndUpdate(idThematic, { $push: { tasks: taskStored._id } }, (err, thematicUpdated) => {
												if (err) {
													res.status(500).send({
														message: "Error al guardar datos"
													});
												} else {
													if (!thematicUpdated) {//Guardo thematic
														res.status(200).send({
															message: "Error al guardar thematica de la tarea"
														});
													} else {
														res.status(200).send({
															taskStored: taskStored
														});
													}
												}
											});
										} else {
											res.status(200).send({
												taskStored: taskStored
											});
										}
									}
								});
							}
						}
					});
				}
			}
		});
	} catch (error) { console.log("error to save a task " + error) }
}


// ACTUALIZAR CON EL VALOR DE USUARIO
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

// ACTUALIZAR CON EL VALOR DE USUARIO
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
			res.status(500).send({ message: "Error al buscar por id " });
		} else {
			if (!task) {
				res.status(200).send({ message: "No se encuentra el elemento con ese id" });
			} else {
				if (task.priority && (task.priority >= 1 && task.priority < 3)) {
					Task.findByIdAndUpdate(task, { priority: task.priority + 1 }, (err, taskUpdated) => {
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
					Task.findByIdAndUpdate(task, { priority: task.priority - 1 }, (err, taskUpdated) => {
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





module.exports = {
	createTask,
	updateTask,
	deleteTask,
	upPriority,
	downPriority,
	filterByPriority
}