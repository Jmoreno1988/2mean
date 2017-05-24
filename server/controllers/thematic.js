'use strict'

//Cargamos elesquema a utilizar 
var Task = require('../models/taskModel');
var Thematic = require('../models/thematicModel');
var User = require('../models/userModel');

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

//Cuando eliminamos una temática, las tareas que tenga dentro:....¿se eliminan también, o pasan a tareas sin tematicas....?
function deleteThematic(rep, res){
    var thematic = new Thematic();
    var params = req.body;
    thematic.id = params.id;
    thematic.userId = params.userId;

}

function saveThematic(req, res) {
    var thematic = new Thematic();
    var params = req.body;
    thematic.title = params.title;
    thematic.userId = params.userId;
  
    //antes de guardar compruebo que no tenga ya el tematico con el mismo titulo
    Thematic.find({ title: thematic.title }, { userId: thematic.userId }).exec((err, thematics) => {
        if (err) {
            res.status(500).send({ message: "Error al leer datos" });
        } else {
            if (!thematics) {
                res.status(200).send({ message: "No hay datos para leer" });
            } else if (thematics.length > 0) {
                res.status(200).send({ message: "El usuario ya tiene una thematica con ese titulo", thematics: null });
                return;
            } else {
                thematic.save((err, thematicStored) => {
                    if (err) {
                        res.status(500).send({ messsage: 'Error en la petición' });
                    } else {
                        if (!thematicStored) {
                            res.status(400).send({ message: 'No se ha guardado la thematica' });
                        } else {
                            // Actualizo la tabla de usuarios asignandole la nueva thematica.
                            var idUser = params.userId;
                            User.findByIdAndUpdate(idUser, { $push: { thematic: thematicStored._id } }, (err, thematicUpdated) => {
                                if (err) {
                                    res.status(500).send({message: "Error al guardar datos"});
                                } else {
                                    if (!thematicUpdated) {//Guardo el usuario de la tarea
                                        res.status(200).send({message: "Error al guardar la tarea para el usuario activo"});
                                    } else {//Guardo user en thematic
                                        res.status(200).send({
                                            thematicStored: thematicStored
                                        });
                                    }
                                }
                            });
                        }
                    }

                });

            }
        }

    });
}



module.exports = {
    saveThematic,
    getAllThematics
}
