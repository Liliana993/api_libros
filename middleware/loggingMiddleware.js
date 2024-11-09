//middleware /logging / Registra cada solicitud a nuestra app

const loggingMiddleware = (req, res, next) =>{
    const method = req.method; //GET, POST, PUT, DELETE
    const url = req.url;//URL de la solicitud
    const time = new Date().toLocaleString(); //Fecha y hora de la sulicitud

    console.log(`[${time}] ${method} ${url}`);

    next();//Pasar al siguiente middleware o ruta
};

module.exports = loggingMiddleware;