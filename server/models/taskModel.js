'use strict'

var mongoose = require('../../client/node_modules/mongoose');
var Schema = mongoose.Schema;


//Creamos los esquemas necesarios para nuestra Colección de BBDD
var taskSchema = Schema({
	title:String,
	description: String,
	date: Date,
	priority: Number
});

//se especifica la colleccion
module.exports = mongoose.model('taskModel', taskSchema);