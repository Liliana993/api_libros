const mongoose = require('mongoose');

//funcion para conectar a MongoDb
const dbConnect = async() =>{
    try{
        mongoose.set("strictQuery", true);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexion exitosa a la base de datos');
    }catch(err){
console.error('Error en la conexion a la base de datos', err);
process.exit(1); //se detiene el proceso si hay un error
    }
}

module.exports = dbConnect;