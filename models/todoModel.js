const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['Complete', 'Pending'], //Enum es el estado predefinido. En este caso tenemos 2 opciones
            required: true
        },
        fechaDeRealizacion: {
            type: Date,
        }
    },
    {
        timestamps: true //agregamos fecha de creación y/o modificación
    }
);

//esto nos permite interactuar con la colección de tareas en la base de datos
const ModelTask = mongoose.model('tareas', todoSchema);
module.exports = ModelTask;