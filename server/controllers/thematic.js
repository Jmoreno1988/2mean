'use strict'

//Cargamos elesquema a utilizar 
var Task = require('../models/taskModel');
var Thematic = require('../models/thematicModel');
var User = require('../models/userModel');


function saveThematic(req, res) {
    var thematic = new Thematic();
    var params = req.body;
    thematic.title = params.title;
    thematic.userId = params.userId;
    console.log( thematic.userId);
    //antes de guardar compruebo que no tenga ya el tematico con el mismo titulo
    var isrepeat = false;
    Thematic.find({}).exec((err, thematics) => {
        if (err) {
            res.status(500).send({ message: "Error al leer datos" });
        } else {
            if (!thematics) {
                res.status(200).send({ message: "No hay datos para leer" });
            } else {
                for(var i = 0; i < thematics.length; i++) {
                    if (params.title === thematics[i].title) {
                        isrepeat = true;
                        res.status(200).send({ message: "Ya existe ese titulo", thematic: null });
                        break;
                    }
                }
                if (!isrepeat) {
                    console.log(thematic);
                    thematic.save((err, thematicStored) => {
                        if (err) {
                            res.status(500).send({ messsage: 'Error en la petición' });
                        } else {
                            if (!thematicStored) {
                                res.status(400).send({ message: 'No se ha guardado la imagen' });
                            } else {
                                res.status(200).send({ thematic: thematicStored });
                            }
                        }
                    });
                }
            }
        }
    });

}

function getAllThematics(req, res) {
    console.log("estoy en getAllThematics");
    Thematic.find({}).exec((err, thematics) => {
        if (err) {
            res.status(500).send({
                message: "Error al leer datos"
            });
        } else {
            if (!thematics) {
                res.status(200).send({
                    message: "No hay datos para leer"
                });
            } else {
                res.status(200).send({
                    thematics: thematics
                });
            }
        }
    });
}


module.exports = {
    saveThematic,
    getAllThematics

}
