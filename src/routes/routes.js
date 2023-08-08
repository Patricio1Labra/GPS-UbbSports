const express = require('express');
const router = express.Router();
const { Entrenamiento } = require('../models/modelo');
const moment = require('moment'); // Importa el paquete moment

router.post('/crearEntrenamientos/:idCurso', async (req, res) => {
  const { idCurso } = req.params;
  const { fecha, horaInicio, horaTermino, descripcion } = req.body;

  try {
    const nuevaHoraInicio = moment(horaInicio, 'HH:mm').toDate();
    const nuevaHoraTermino = moment(horaTermino, 'HH:mm').toDate();

    const nuevoEntrenamiento = new Entrenamiento({
      nombreRama: idCurso, // Usa el id del curso como nombreRama
      asistencia: {
        fecha,
        estado: false,
      },
      horaEntrada: nuevaHoraInicio,
      horaSalida: nuevaHoraTermino,
      descripcion: descripcion,
    });

    await nuevoEntrenamiento.save();
    res.status(201).json({ mensaje: 'Entrenamiento creado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear el entrenamiento' });
  }
});

router.put('/actualizarReserva/:id', async (req, res) => {
  const reservaId = req.params.id;
  const { horaInicio, horaFin, descripcion } = req.body;

  try {
    const reservaActualizada = await Entrenamiento.findByIdAndUpdate(
      reservaId,
      {
        horaEntrada: horaInicio,
        horaSalida: horaFin,
        descripcion: descripcion
      },
      { new: true }
    );

    if (!reservaActualizada) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada' });
    }

    res.status(200).json({ mensaje: 'Reserva actualizada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la reserva' });
  }
});

router.get('/obtenerReservasPorCurso/:idCurso', async (req, res) => {
  const idCurso = req.params.idCurso;

  try {
    const reservas = await Entrenamiento.find({ nombreRama: idCurso }); // Busca las reservas con el mismo nombreRama (ID del curso)
    res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las reservas por curso' });
  }
});


router.get('/api/obtenerRamas', async (req, res) => {
  try {
    const ramas = await RamaDeportiva.find();
    res.status(200).json(ramas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las ramas' });
  }
});




router.post('/inscripciones', async (req, res) => {
  try {
    const datosInscripcion = req.body;

    // Crea una nueva instancia del modelo RamaDeportiva con los datos recibidos
    const nuevaRamaDeportiva = new RamaDeportiva({
      alumnos: [], 
      nombre: datosInscripcion.nombre,
      descripcion: datosInscripcion.espacioDeportivo, 
      entrenador: datosInscripcion.profe,
      horario: `${datosInscripcion.horarioDia} ${datosInscripcion.horarioInicio}`,
      cupos: datosInscripcion.cupos,
      asistencia: [],
      recinto: datosInscripcion.espacioDeportivo, 
      entrenamiento: datosInscripcion.descripcion, 
    });

    await nuevaRamaDeportiva.save();

    res.status(201).json({ message: 'Inscripción realizada con éxito' });
  } catch (error) {
    console.error('Error al enviar la inscripción:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


module.exports = router;
