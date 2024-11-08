const express = require('express');
const dbConnect = require('./config/db');
const app = express();
const port = 3000;
const librosRoutes = require('./routes/libro')

app.use(express.json());
app.use(librosRoutes);

//conectar a la base de datos
dbConnect().then(() =>{
    app.listen(port, () =>{
        console.log('El servidor esta corriendo en el puerto: ', port);
    });

}).catch(err =>{
    console.log('No se ha podido conectar a la base de datos');
});