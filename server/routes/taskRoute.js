'use strict'

//var express = require('../../client/node_modules/express');
var express = require('express');

var taskController = require('../controllers/task');
var api = express.Router();

api.get('/test/:user?', taskController.test);
api.get('/test2', taskController.test2);
api.get('/getAllTask', taskController.getAllTask);
api.post('/saveTask', taskController.saveTask);
api.get('/getTask/:id', taskController.getTask);
api.put('/updateTask/:id', taskController.updateTask);
api.delete('/deleteTask/:id', taskController.deleteTask);

module.exports = api;