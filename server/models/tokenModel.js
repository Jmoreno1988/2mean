'use strict'

//var mongoose = require('../../client/node_modules/mongoose');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Creamos los esquemas necesarios para nuestra Colección de BBDD
var tokenSchema = Schema({
	token:String,
	userId:[{type: Schema.ObjectId, ref: 'userModel'}],	
	date: Date
},{ collection : 'tokens' }); // Especificamos la collection para obtener los datos. En caso de no ponerlo obtenemos un []

//se especifica la colleccion
module.exports = mongoose.model('tokenSchema', tokenSchema);