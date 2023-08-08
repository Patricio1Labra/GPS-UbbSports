const express = require('express');
const router = express.Router();
const Prueba = require('../models/modelo');

router.get('/', async (req, res) => {
    try {
        const modelos = await Prueba.find().exec();
        console.log(modelos);
        res.json(modelos); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor'); 
    }
});
router.get('/:id', async (req, res) => {
    try {
        const modelo = await Prueba.findById().exec();
        console.log(modelo);
        res.json(modelo); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor'); 
    }
});

router.post('/', async (req, res) => {
    try {
        const nuevoModelo = new Prueba(req.body); // Suponiendo que estás pasando los datos en el cuerpo de la solicitud (req.body)
        const resultado = await nuevoModelo.save();
        console.log('Nuevo modelo guardado:', resultado);
        res.status(201).send(resultado); // 201: Created
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        const nuevoModelo = new Prueba(req.body);
        const resultado = await Prueba.findByIdAndUpdate(id,nuevoModelo);
        
        if (resultado) {
            console.log('Modelo eliminado:', resultado);
            res.send(resultado);
        } else {
            res.status(404).send('No se encontró el modelo');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
        const resultado = await Prueba.findByIdAndUpdate(id);
        
        if (resultado) {
            console.log('Modelo eliminado:', resultado);
            res.send(resultado);
        } else {
            res.status(404).send('No se encontró el modelo');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});


module.exports = router;