const express = require('express');
const router = express.Router();
const ModelLibro = require('../models/libroModel');

const authMiddleware = require('../middleware/authMiddleware');
const errorMiddleware = require('../middleware/errorMiddleware');


//obtener todos los libros
router.get('/libros', async(req, res)=>{
    try{
        const libros = await ModelLibro.find();
        res.status(200).send(libros);
    }catch(error){
        /*res.status(500).send({message: 'Error al obtener los libros'}, error);*/
        next(errorMiddleware);  // Delegamos el error al middleware de manejo de errores
    }
})

//obtener un libro por ID
router.get('/libros/:id', async(req, res) =>{
    try{
        const libro = await ModelLibro.findById(req.params.id);

        //Si no encuentra el libro, arroja un mensaje de no encontrado
        if(!libro){
            return res.status(404).send({message: 'Libro no encontrado'})
        }
        //si todo esta ok
        res.status(200).send(libro);
    }catch(error){
        res.status(500).send({message: 'Error al obtener el libro', error});
    }
});

//Crear un nuevo Libro
router.post('/libros', authMiddleware, async(req, res)=>{
    const body = req.body;
    try{
        const nuevoLibro = await ModelLibro.create(body)
        res.status(201).send(nuevoLibro);
    }catch(error){
        res.status(400).send(error);
    }
});

//Actualizar libro por ID
router.put('/libros/:id', async(req, res)=>{
    try{
        const libroActualizado = await ModelLibro.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!libroActualizado){
            return res.status(404).send({message: 'Libro no encontrado'})
        }
        res.status(200).send(libroActualizado);
    }catch(error){
        res.status(400).send({message: 'Error al actualizar el libro'})
    }
})

//Eliminar un libro por ID
router.delete('/libros/:id', async(req, res)=>{
    try{
        const libroEliminado = await ModelLibro.findOneAndDelete(req.params.id);
        if(!libroEliminado){
            return res.status(404).send({message: 'Libro no encontrado'});
        }
        res.status(200).send({message: 'Libro eliminado correctamente'})
    }catch(error){
        res.status(500).send({message: 'Error al eliminar el libro', error});
    }
});

//--------------------FILTRO DE BUSQUEDA---------------------
router.get('/libros/negocio/busqueda', async (req, res) =>{
    //Obtener libros segun los filtros de busqueda
    const {autor, categoria, estado} = req.query;//abtenemos autor, categoria y estado de los query
    try{
        const query = {}
        if(autor) query.autor = autor;//Si el autor esta en los query params, lo va agregar al filtro
        if(categoria) query.categoria = categoria; //Si categoria esta en los query params, lo va agregar al filtro
        if(estado) query.estado = estado;//Si el estado esta en los query params, lo va agregar al filtro

        const libros = await ModelLibro.find(query);//Buscamos los libros con los filtros

        if(!libros.length){
            return res.status(404).send({message: 'No se encontraron los libros con los filtros proporcionados'})
        }
        res.status(200).send(libros);
    }catch(error){
        res.status(500).send({message: 'Error al obtener los libros', error});
    }

});

//Acturlizar el estado de un libro 'Prestado' y agregar la fecha de préstamo y de devolución
router.put('/libros/:id/prestar', async(req, res) =>{
    try{
        //Encontrar el libro
        const libro = await ModelLibro.findById(req.params.id);
        if(!libro){
            return res.status(404).send({message: 'Libro no encontrado'})
        }
        //cambiarle el estado
        libro.estado = 'Prestado';
        libro.fechaPrestamo = new Date();//fecha de prestamo => fecha actual
        
        //Definimos la fecha de devolución
        const fechaDevolucion = new Date();
        fechaDevolucion.setDate(fechaDevolucion.getDate() + 14); //A esa fecha actual le sumamos 14 dias
        libro.fechaDevolucion = fechaDevolucion;

        //Guardar el libro
        await libro.save();
        res.status(200).send(libro);

    }catch(error){
        res.status(400).send({message: 'Error al actualzar el estado del libro', error})
    }
});

//endpoint de estado del libro a 'Disponible' y ademas limpiar la fecha de devolución
router.put('/libros/:id/devolver', async(req, res) => {
    try{
        //encontrar el libro
        const libro = await ModelLibro.findById(req.params.id);

        if(!libro){
            return res.status(404).send({message: 'Libro no encontrado'})
        }

        //cambiarle el estado al libro
        libro.estado = 'Disponible';
        libro.fechaPrestamo = null; //limpiar la fecha de préstamo
        libro.fechaDevolucion = null;//limpiar la fecha de devolución

        await libro.save();//guardamos los cambios
        res.status(200).send(libro);

    }catch(error){
        res.status(400).send({message: 'Error al devolver el libro', error});
    }
})

module.exports = router;