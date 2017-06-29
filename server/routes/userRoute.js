'use strict'

//var express = require('../../client/node_modules/express');
var express = require('express');

var userController = require('../controllers/user');
var api = express.Router();


//api.get('/getAllInfoUser/:idUser', userController.getAllInfoUser);
api.get('/getAllUser', userController.getAllUser);

api.get('/getThematicForUse/:name', userController.getThematicForUse);
api.get('/getTaskforUser/:idUser', userController.getTaskforUser);
api.post('/createUser', userController.createUser);
api.post('/getAllInfoUser', userController.getAllInfoUser);
api.get('/checkSession/:id', userController.checkSession);


module.exports = api;