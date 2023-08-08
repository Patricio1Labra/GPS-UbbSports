const express = require('express');
const router = express.Router();
const {RecintoDeportivo,SolicitudRecinto} = require('../models/modelo');

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

router.post('/cr', async (req, res) => {
    const { fecha, horaInicio, horaTermino, descripcion } = req.body;
  
    try {
      const nuevoEntrenamiento = new Entrenamiento({
        asistencia: {
          fecha,
          estado: false, // Por defecto, el estado de asistencia podría ser falso
        },
        horaEntrada: horaInicio,
        horaSalida: horaTermino,
        descripcion: descripcion,
      });
  
      await nuevoEntrenamiento.save();
      res.status(201).json({ mensaje: 'Entrenamiento creado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear el entrenamiento' });
    }
  });



  router.get('/recintos', async (req, res) => {
    try {
        const recintos = await RecintoDeportivo.find();
        res.status(200).json(recintos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener la lista de recintos' });
    }
});





  router.post('/crear-solicitud-recinto', async (req, res) => {
    const { nombre, descripcion, estudiante, estadosolicitud, RecintoDeportivo } = req.body;

    try {
        const nuevaSolicitudRecinto = new SolicitudRecinto({
            nombre,
            descripcion,
            estudiante,
            fechadesolicitud: new Date(),
            estadosolicitud,
            RecintoDeportivo
        });
        await nuevaSolicitudRecinto.save();
        res.status(201).json({ mensaje: 'Solicitud de recinto creada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear la solicitud de recinto' });
    }
});


module.exports = router;