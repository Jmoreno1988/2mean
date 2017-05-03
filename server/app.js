'use strict'

//Carga el módulo de express
//Este modulo sirve para gestionar
//peticiones y comunicaciones HTTP
//var express = require('../client/node_modules/express');
var express = require('express');
var app = express();

//incluimos cabecera


//Cargamos las rutas
var task_routes = require('./routes/taskRoute');

//Cargar bodyParser
//Esto lo que hace es que todo lo que llegue le haga un
//parse a un JSON. Para eso sirve el bodyParse.
//var bodyParser = require('../client/node_modules/body-parser');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));//Limpia URL
app.use(bodyParser.json());

// middleware
//permite cabeceras
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers','X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

	next();
});


app.use("/api", task_routes);

//NOTA: Se puede usar el mismo api para disntitas rutas
//Por ejemplo, para usar las pruebas con API sería:
//app.use("/api", apiPrueba);


//JOTF: Se lleva a controllers, rutas, etc
//Llamada a /prueba con get
/*app.get('/prueba', function(req, res){
	//res.send({message: "Hola Mundo desde Node"});

	res.status(200).send({
		data: [1, 2, 3],
		message: "Envio de un array"
	});
});*/

//Recibe el parámetro user (usando:), y puede ser opcional (?)
/*app.get('/prueba_user/:user?/:pass?', (req, res) => {
	//var user = req.params.user != undefined ? req.params.user : "Usuario Generico";
	var user = req.params.user || "Usuario Generico";
	var pass = req.params.pass || "NONE";
	res.status(200).send({
		message: "Buenos días " + user + " desde NODE; Pass: " + pass
	});
});*/


//Para usarlo como modulo, exportamos el objeto app.
module.exports = app;