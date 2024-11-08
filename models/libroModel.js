const mongoose = require('mongoose');
const libroSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true,
        },
        autor: {
            type: String,
            required: true,
        },
        categoria: {
            type: String,
            required: true
        },
        estado: {//Enum es un estado predefinido: solo podemos tener esas opciones ya definidos
            type: String,
            enum: ['Disponible', 'Prestado', 'Vendido'],
            default: 'Disponible',
        },
        fechaPrestamo: {
            type: Date
        },
        fechaDevolucion: {
            type: Date,
        }
    }, //configuraciones adicionales
    {
        timestamps: true, //fecha de creación y modificación de columna
    }
);
//esto nos permite interactuar con la colección de libros en la base de datos
const ModelLibro = mongoose.model('libros', libroSchema);
module.exports = ModelLibro;