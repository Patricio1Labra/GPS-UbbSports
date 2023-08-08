const express = require('express');
const router = express.Router();
const Prueba = require('../models/modelo');

router.post('/solicitudesImplementos', async (req, res) => {
    const { nombre, descripcion, cantidad, fechadesolicitud, estadosolicitud } = req.body;

    try {
        // Validar campos requeridos
        if (!nombre || !descripcion || !cantidad || !fechadesolicitud) {
            return res.status(400).json({ error: 'Faltan campos obligatorios en la solicitud' });
        }

        // Validar que cantidad sea mayor que cero
        if (cantidad <= 0) {
        return res.status(400).json({ error: 'El campo "cantidad" debe ser mayor que cero' });
        }

        // Validar longitud de texto para nombre y estadosolicitud
        if (nombre.length < 3 || nombre.length > 50) {
            return res.status(400).json({ error: 'El campo "nombre" debe tener entre 3 y 50 caracteres' });
        }
        if (estadosolicitud.length > 100) {
            return res.status(400).json({ error: 'El campo "estadosolicitud" no puede exceder los 100 caracteres' });
        }

        // Validar que fechadesolicitud sea una fecha válida
        if (isNaN(Date.parse(fechadesolicitud))) {
            return res.status(400).json({ error: 'El campo "fechadesolicitud" no es una fecha válida' });
        }
        
        // Crear una nueva instancia del modelo de solicitud con los datos recibidos
        const SolicitudImplementos = new SolicitudImplementos({
            nombre,
            descripcion,
            cantidad,
            fechadesolicitud,
            estadosolicitud
        });
        // Guardar la solicitud en la base de datos
        await SolicitudImplementos.save();
        console.log('Solicitud de implementos creada exitosamente');
        res.status(201).json({ message: 'Solicitud de implementos creada exitosamente' });
    } catch (error) {
        console.error('Error al crear la solicitud de implementos', error);
        res.status(500).json({ error: 'Error al crear la solicitud de implementos' });
    }
});

router.post('/solicitudesRecursos', async (req, res) => {
    const { nombreSolicitante, monto, descripciondeSolicitud, ramaSolicitante, participantes, estadoSolicitud } = req.body;

    try {
        // Validar campos requeridos y longitud de texto
        if (!nombreSolicitante || !monto || !descripciondeSolicitud || !ramaSolicitante || !participantes) {
            return res.status(400).json({ error: 'Faltan campos obligatorios en la solicitud' });
        }

        if (nombreSolicitante.length < 3 || nombreSolicitante.length > 50) {
            return res.status(400).json({ error: 'El campo "nombreSolicitante" debe tener entre 3 y 50 caracteres' });
        }

        if (descripciondeSolicitud.length > 100) {
            return res.status(400).json({ error: 'El campo "descripciondeSolicitud" no puede exceder los 100 caracteres' });
        }

        if (ramaSolicitante.length < 3 || ramaSolicitante.length > 20) {
            return res.status(400).json({ error: 'El campo "ramaSolicitante" debe tener entre 3 y 20 caracteres' });
        }

        if (participantes.length <3 || participantes.length > 100) {
            return res.status(400).json({ error: 'El campo "estadoSolicitud" debe tener entre 3 y 100 caracteres' });
        }

        // Validar que monto sea mayor que cero
        if (monto <= 0) {
            return res.status(400).json({ error: 'El campo "monto" debe ser mayor que cero' });
        }

        // Crear una nueva instancia del modelo de recursos con los datos recibidos
        const nuevaSolicitudRecursos = new Recursos({
            nombreSolicitante,
            monto,
            descripciondeSolicitud,
            ramaSolicitante,
            participantes,
            estadoSolicitud
        });

        // Guardar la solicitud de recursos en la base de datos
        await nuevaSolicitudRecursos.save();
        console.log('Solicitud de recursos creada exitosamente');
        res.status(201).json({ message: 'Solicitud de recursos creada exitosamente' });
    } catch (error) {
        console.error('Error al crear la solicitud de recursos', error);
        res.status(500).json({ error: 'Error al crear la solicitud de recursos' });
    }
});

router.get('/solicitudesRecursos', async (req, res) => {
    try {
        const solicitudes = await Recursos.find(); // Obtener todas las solicitudes de la base de datos
        res.status(200).json(solicitudes);
    } catch (error) {
        console.error('Error al obtener las solicitudes de recursos', error);
        res.status(500).json({ error: 'Error al obtener las solicitudes de recursos' });
    }
});

module.exports = router;