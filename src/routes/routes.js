const express = require('express');
const router = express.Router();
const { Estudiante, HorarioEstudiante } = require('../models/modelo'); // Asegúrate de que la ruta sea correcta
const { RamaDeportiva } = require('../models/modelo'); // Asegúrate de que la ruta sea correcta

// Ruta para agregar un estudiante
router.post('/estudiantes', async (req, res) => {
  try {
    const { nombre, carrera, correo, rut, telefono, descripcion, contraseña, ramaDeportiva, implementosSolicitados, recintoSolicitado } = req.body;

    const nuevoEstudiante = new Estudiante({
      nombre,
      carrera,
      correo,
      rut,
      telefono,
      descripcion,
      contraseña,
      ramaDeportiva,
      implementosSolicitados,
      recintoSolicitado
    });

    await nuevoEstudiante.save();

    res.status(201).json({ mensaje: 'Estudiante agregado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el estudiante' });
  }
});

// Ruta para ver las ramas deportivas de un estudiante
router.get('/estudiantes/:id/ramas-deportivas', async (req, res) => {
  try {
    const estudianteId = req.params.id;

    const estudiante = await Estudiante.findById(estudianteId);

    if (!estudiante) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    const ramasDeportivas = estudiante.ramaDeportiva;

    res.json({ ramasDeportivas });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las ramas deportivas del estudiante' });
  }
});



// Ruta para agregar un nuevo estudiante
router.post('/post-horario-estudiante', async (req, res) => {
  try {
    const nuevoEstudiante = await HorarioEstudiante.create(req.body);
    res.status(201).json(nuevoEstudiante);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al agregar el estudiante', error: error.message });
  }
});

// Ruta para ver el nombre de las ramas deportivas de un estudiante por su ID
router.get('/estudiante/:id/ramas', async (req, res) => {
  try {
    const estudiante = await HorarioEstudiante.findById(req.params.id);
    if (!estudiante) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }

    const Ramas = estudiante.ramaDeportiva.map(rama => rama);
    res.status(200).json(Ramas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
});





router.post('/ramas-deportivas', async (req, res) => {
  try {
    const nuevaRama = new RamaDeportiva(req.body);
    const ramaGuardada = await nuevaRama.save();
    res.status(201).json(ramaGuardada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al agregar la Rama Deportiva', error: error.message });
  }
});

module.exports = router;
