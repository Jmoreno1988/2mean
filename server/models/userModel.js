'use strict'

//var mongoose = require('../../client/node_modules/mongoose');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Thematic = require('thematicModel');

//Creamos los esquemas necesarios para nuestra Colección de BBDD
var userSchema = Schema({
	name:String,
	password: String,
	thematic:[{type: Schema.ObjectId, ref: 'thematicModel'}],
	tasks: [{type: Schema.ObjectId, ref: 'taskModel'}]
	

}, { collection : 'users' }); // Especificamos la collection para obtener los datos. En caso de no ponerlo obtenemos un []

//se especifica la colleccion
module.exports = mongoose.model('userModel', userSchema);