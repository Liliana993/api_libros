const express = require('express');
const router = express.Router();
const ModelTask = require('../models/todoModel');


//obtener todas las tareas
router.get('/tasks', async(req, res) => {
    try{
        const tareas = await ModelTask.find();
        res.status(200).send(tareas);
    }catch(error){
        res.status(500).send({messages: "Error al obtener las tareas"}, error);
    }
})

//Obtener la tarea por id
router.get('/tasks/:id', async(req, res) => {
    try{
        const tarea = await ModelTask.findById(req.params.id);
         //si no encuentra la tarea, arroja un mensaje de error
         if(!tarea){
            return res.status(404).send({messages: "Tarea no encontrada."})
         }
         //si esta todo OK
         res.status(200).send(tarea);

    }catch(error){
        res.status(500).send({messages: "Error al buscar la tarea"}, error);
    }
});


//Crear una nueva tarea
router.post('/tasks', async(req, res) => {
    const body = req.body;
    try{
        const nuevaTarea = await ModelTask.create(body);
        res.status(200).send(nuevaTarea);
    }catch(error){
        res.status(400).send({messages: "Error al intentar crear la tareaa"}, error);
    }
})

//Auctualizar tarea
router.put('/tasks/:id', async(req, res) => {
    try{
        const tareaActualizar = await ModelTask.findByIdAndUpdate(req.params.id, req.body);

        //en caso de no encontrar la tarea a actualizar
        if(!tareaActualizar){
            return res.status(404).send({messages: "tarea no encontrada."})
        }
        //todo OK
        res.status(200).send(tareaActualizar);
    }catch(error){
        res.status(400).send({messages: "Error al intentar actualizar."}, error);
    }
});

//Eliminar tarea
router.delete('/tasks/:id', async(req, res) => {
    try{
        const tareaAEliminar = await ModelTask.findOneAndDelete(req.params.id);
        //si no encunetra la tareas
        if(!tareaAEliminar){
            return res.status(404).send({messages: "Error, no se encontro la tarea"}, error)
        }
        res.status(200).send({messages: "Tarea eliminada con éxito!"})
    }catch(error){
        res.status(500).send({messages: "Error al intentar eliminar tareas"}, error);
    }
})

module.exports = router;