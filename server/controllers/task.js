'use strict'

//Cargamos elesquema a utilizar 
var Task = require('../models/taskModel');

function test(req, res){
	console.log("estoy en test");
	var user;
	if (req.params.user){
		 user = req.params.user
	}else{
		user = "No User";
	}

	res.status(200).send({
		message: "Hola desde Controller: " + user
	});
}

function test2(req, res){
	console.log("estoy en test2");
	

	res.status(200).send({
		message: "Hola 222222: " 
	});
}


function getAllTask(req, res){
	//para devolver toda la colección ordenada por url
	console.log("estoy en getAllTask");
	Task.find({}).sort('-date').exec((err, tasks) =>{
		if(err){
			res.status(500).send({
				message : "Error al leer datos"
			});
		}else{
			if(!tasks){
				res.status(200).send({
					message : "No hay datos para leer"
				});
			}else{
				res.status(200).send({
					tasks : tasks
				});
			}
		}
	});	
}

module.exports = {
	test,
	test2, 
	getAllTask
}