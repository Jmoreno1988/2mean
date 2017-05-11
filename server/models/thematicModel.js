'use strict'

//var mongoose = require('../../client/node_modules/mongoose');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Creamos los esquemas necesarios para nuestra Colección de BBDD
var thematicModel = Schema({
	id:String,
	title:String,
	tasks: [{type: Schema.ObjectId, ref: 'taskModel'}]
	
},{ collection : 'thematics' }); // Especificamos la collection para obtener los datos. En caso de no ponerlo obtenemos un []

//se especifica la colleccion
module.exports = mongoose.model('thematicModel', thematicModel);