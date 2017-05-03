'use strict'

var mongoose = require('../client/node_modules/mongoose');

//Importar el archivo app.js
var app = require('./app');

//Recoger por qué puerto se va a trabajar
var port = process.env.PORT || 3688;

//conectamos a la BBDD
mongoose.connect('mongodb://127.0.0.1/twomean', (err, res) => {
	if(!err){
		console.log('Mongo Funcionando');
		app.listen(port, function(){
			console.log("API REST funcionando en http://localhost:" + port);
			console.log("onfireeeeeeeee")	
		});
	}else{
		console.log(err);
	}
});

//Escuchar en el puerto 3678

/*
app.listen(port, function(){
	console.log("API REST funcionando en http://localhost:" + port);	
});
*/