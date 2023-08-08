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
  router.get('/recintos', async (req, res) => {
    try {
        const recintos = await RecintoDeportivo.find();
        res.status(200).json(recintos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener la lista de recintos' });
    }
});

router.get('/solicitudes-recintos', async (req, res) => {
  try {
      const solicitudesRecintos = await SolicitudRecinto.find();
      res.status(200).json(solicitudesRecintos);
  } catch (error) {
      console.error('Error al obtener las solicitudes de recintos', error);
      res.status(500).json({ error: 'Hubo un error al obtener las solicitudes de recintos' });
  }
});

// Ruta para actualizar el estado de una solicitud de recinto
router.put('/solicitudes-recintos/:id', async (req, res) => {
  try {
      const solicitudId = req.params.id;
      const nuevoEstado = req.body.estadosolicitud;

      const solicitudActualizada = await SolicitudRecinto.findByIdAndUpdate(
          solicitudId,
          { $set: { estadosolicitud: nuevoEstado } },
          { new: true }
      );

      res.json(solicitudActualizada);
  } catch (error) {
      console.error('Error al actualizar el estado de la solicitud de recinto', error);
      res.status(500).json({ error: 'Error al actualizar el estado de la solicitud de recinto' });
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