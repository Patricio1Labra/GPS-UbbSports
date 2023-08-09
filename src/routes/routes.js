const express = require('express');
const router = express.Router();
const { Entrenamiento } = require('../models/modelo');
const { Estudiante } = require('../models/modelo');
const { RamaDeportiva } = require('../models/modelo');
const { Asistencia } = require('../models/modelo');
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



router.get('/obtenerRamas', async (req, res) => {
  try {
    const ramas = await RamaDeportiva.find(); // Consulta todas las ramas deportivas
    res.status(200).json(ramas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las ramas deportivas' });
  }
});

router.get('/obtenerEntrenamientosPorRama/:nombreRama', async (req, res) => {
  const { nombreRama } = req.params;

  try {
    const entrenamientos = await Entrenamiento.find({ nombreRama });
    res.json(entrenamientos);
  } catch (error) {
    console.error('Error al obtener entrenamientos:', error);
    res.status(500).json({ error: 'Error al obtener entrenamientos' });
  }
});

// Actualizar entrenamiento
router.put('/actualizarEntrenamiento/:entrenamientoId', async (req, res) => {
  const { entrenamientoId } = req.params;
  const datosActualizados = req.body;

  try {
    const entrenamientoActualizado = await Entrenamiento.findByIdAndUpdate(
      entrenamientoId,
      datosActualizados,
      { new: true }
    );
    res.json(entrenamientoActualizado);
  } catch (error) {
    console.error('Error al actualizar el entrenamiento:', error);
    res.status(500).json({ error: 'Error al actualizar el entrenamiento' });
  }
});

































router.get('/entrenamientos/:ramaNombre', async (req, res) => {
  try {
    const ramaNombre = req.params.ramaNombre;
    const entrenamientos = await Entrenamiento.find({ nombreRama: ramaNombre });
    res.json(entrenamientos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los entrenamientos.' });
  }
});

router.put('/actualizarAsistencia/:entrenamientoId', async (req, res) => {
  const entrenamientoId = req.params.entrenamientoId;
  const nuevaAsistencia = req.body.asistencia;

  try {
    const { entrenamientoId, asistencia } = req.body;

    // Encuentra el entrenamiento por ID
    const entrenamiento = await Entrenamiento.findById(entrenamientoId);

    if (!entrenamiento) {
      return res.status(404).json({ error: 'Entrenamiento no encontrado.' });
    }

    // Crea la asistencia en el entrenamiento
    entrenamiento.asistencia = asistencia;

    // Guarda los cambios en el entrenamiento
    await entrenamiento.save();

    // Crea las entradas individuales de asistencia en la colección de Asistencia
    for (const alumnoId in asistencia) {
      await Asistencia.create({
        nombreAlumno: alumnoId,
        estado: true,
      });
    }

    res.json({ message: 'Asistencia registrada exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar la asistencia.' });
  }
});


// Guardar asistencia
router.post('/asistencia', async (req, res) => {
  try {
    const { entrenamientoId, asistencia } = req.body;

    // Encuentra el entrenamiento
    const entrenamiento = await Entrenamiento.findById(entrenamientoId);

    // Actualiza la asistencia de los estudiantes
    asistencia.forEach(async (asistenciaEstudiante) => {
      const estudiante = await Estudiante.findById(asistenciaEstudiante.estudianteId);
      if (estudiante) {
        // Actualiza la asistencia del estudiante en el entrenamiento
        entrenamiento.asistencia[asistenciaEstudiante.estudianteId] = asistenciaEstudiante.estado;
      }
    });

    // Guarda los cambios en el entrenamiento
    await entrenamiento.save();

    res.json({ message: 'Asistencia guardada exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la asistencia.' });
  }
});

router.get('/alumnos', async (req, res) => {
  try {
    const alumnos = await Estudiante.find();
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los alumnos.' });
  }
});



module.exports = router;
