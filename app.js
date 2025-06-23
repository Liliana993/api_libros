console.log('App Iniciando...')
require('dotenv').config();

const express = require('express');
const app = express();
const dbConnect = require('./config/db');
const todoRoutes = require('./routes/todoRouter');

//Cors
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use("/api",todoRoutes);


//conectar a la base de datos
dbConnect().then(() =>{
        console.log('El servidor esta corriendo.')

}).catch(err =>{
    console.log('No se ha podido conectar a la base de datos');
});

module.exports = app; //exportamos la app para delegarle el control a Vercel