'use strict'

//var express = require('../../client/node_modules/express');
var express = require('express');

var taskController = require('../controllers/task');
var api = express.Router();

api.post('/createTask', taskController.createTask);
api.put('/updateTask/:id', taskController.updateTask);
api.delete('/deleteTask/:id', taskController.deleteTask);
api.put('/upPriority/:id', taskController.upPriority);
api.put('/downPriority/:id', taskController.downPriority);
api.get('/filterByPriority/:priority', taskController.filterByPriority);

module.exports = api;