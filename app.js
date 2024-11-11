console.log('App Iniciando...')
require('dotenv').config();

const express = require('express');
const app = express();
const dbConnect = require('./config/db');
const librosRoutes = require('./routes/libro');

//Middlewares
const loggingMiddleware = require('./middleware/loggingMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const notFoundMiddleware = require('./middleware/notFoundMiddleware');

//Cors
const cors = require('cors');
app.use(cors());

app.use(loggingMiddleware);//Usamos el middleware del logging en toda la app

app.use(express.json());
app.use("/api",librosRoutes);

app.use(notFoundMiddleware); //Usamos el middleware de notfound para ruta no encontrada
app.use(errorMiddleware);//usamos el middleware de error en toda la app


//conectar a la base de datos
dbConnect().then(() =>{
        console.log('El servidor esta corriendo.')

}).catch(err =>{
    console.log('No se ha podido conectar a la base de datos');
});

module.exports = app; //exportamos la app para delegarle el control a Vercel