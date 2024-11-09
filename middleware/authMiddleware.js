//Middleware para realizar una autenticación

//definimos un Token
const TOKEN_SECRET = 'myTokenWebSecret';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if(token === TOKEN_SECRET){
        next();//Si el token es correcto, dejamos que la solicitud continue. Pasa a la ruta
    }else{
        res.status(403).send({message: 'Acceso denegado: Token inválido o no fue enviado.'});
    }
};

module.exports = authMiddleware;