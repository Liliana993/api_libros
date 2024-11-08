const mongoose = require('mongoose');

//funcion para conectar a MongoDb
const dbConnect = async() =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/dbGestorBiblioteca');
        console.log('Conexion exitosa a la base de datos');
    }catch(err){
console.error('Error en la conexion a la base de datos', err);
process.exit(1); //se detiene el proceso si hay un error
    }
}

module.exports = dbConnect;