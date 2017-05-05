'use strict'

//var express = require('../../client/node_modules/express');
var express = require('express');

var thematicController = require('../controllers/thematic');
var api = express.Router();

api.post('/saveThematic', thematicController.saveThematic);
api.get('/getAllThematics', thematicController.getAllThematics);


module.exports = api;