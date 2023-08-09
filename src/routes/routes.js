const express = require('express');
const router = express.Router();
const { Entrenamiento } = require('../models/modelo');
const { Estudiante } = require('../models/modelo');
const { RamaDeportiva } = require('../models/modelo');
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

router.put('/actualizarEntrenamiento/:id', async (req, res) => {
  try {
    const idEntrenamiento = req.params.id;
    const datosActualizados = req.body;
    const entrenamientoActualizado = await Entrenamiento.findByIdAndUpdate(
      idEntrenamiento,
      { $set: datosActualizados },
      { new: true }
    );
    res.json(entrenamientoActualizado);
  } catch (error) {
    console.error('Error al actualizar el entrenamiento:', error);
    res.status(500).json({ error: 'Error al actualizar el entrenamiento' });
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

router.get('/obtenerEntrenamientosPorRama/:idRama', async (req, res) => {
  try {
    const idRama = req.params.idRama;
    const entrenamientos = await Entrenamiento.find({ nombreRama: idRama });
    res.json(entrenamientos);
  } catch (error) {
    console.error('Error al obtener los entrenamientos por rama:', error);
    res.status(500).json({ error: 'Error al obtener los entrenamientos por rama' });
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
