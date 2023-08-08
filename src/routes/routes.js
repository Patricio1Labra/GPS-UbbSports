const express = require('express');
const router = express.Router();
const {RecintoDeportivo} = require('../models/modelo');

router.post('/crear', async (req, res) => {
    const { nombre, tipo } = req.body;

    try {
        const nuevoRecinto = new RecintoDeportivo({ nombre, tipo });
        await nuevoRecinto.save();
        res.status(201).json({ mensaje: 'Recinto deportivo creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el recinto deportivo' });
    }
});




module.exports = router;