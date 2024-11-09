const express = require('express');
const dbConnect = require('./config/db');
const app = express();
const port = 3000;
const librosRoutes = require('./routes/libro');

//Middlewares
const loggingMiddleware = require('./middleware/loggingMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const notFoundMiddleware = require('./middleware/notFoundMiddleware');

//Cors
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

//Cors
app.use(cors(corsOptions));

app.use(loggingMiddleware);//Usamos el middleware del logging en toda la app

app.use(express.json());
app.use(librosRoutes);


app.use(errorMiddleware);//usamos el middleware de error en toda la app
app.use(notFoundMiddleware); //Usamos el middleware de notfound para ruta no encontrada

//conectar a la base de datos
dbConnect().then(() =>{
    app.listen(port, () =>{
        console.log('El servidor esta corriendo en el puerto: ', port);
    });

}).catch(err =>{
    console.log('No se ha podido conectar a la base de datos');
});