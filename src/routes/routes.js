const express = require('express');
const router = express.Router();
const {
  Estudiante,
  Profesor,
  RamaDeportiva,
  EspacioDeportivo
} = require('../models/modelo');

router.post('/estudiantes', async (req, res) => {
  try {
    const nuevoEstudiante = new Estudiante(req.body);
    const estudianteGuardado = await nuevoEstudiante.save();
    res.status(201).json(estudianteGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el estudiante', error: error.message });
  }
});
router.post('/ramas', async (req, res) => {
  try {
    const nuevaRama = await RamaDeportiva.create(req.body);
    res.status(201).json(nuevaRama);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear rama' });
  }
});


router.get('/estudiantes', async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
});

router.get('/estudiantes/:id', async (req, res) => {
  try {
      const estudianteId = req.params.id;
      const estudiante = await Estudiante.findById(estudianteId);
      
      if (!estudiante) {
          return res.status(404).json({ error: 'Estudiante no encontrado' });
      }
      
      res.json(estudiante);
  } catch (error) {
      console.error('Error al obtener la información del estudiante:', error);
      res.status(500).json({ error: 'Error del servidor' });
  }
});


router.get('/estudiantes/:id/ramas', async (req, res) => {
  try {
    const estudianteId = req.params.id;
    const estudiante = await Estudiante.findById(estudianteId);

    if (!estudiante) {
      return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
    }

    const ramasDeportivas = estudiante.ramaDeportiva || [];
    res.json(ramasDeportivas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las ramas deportivas', error: error.message });
  }
});

router.get('/ramas', async (req, res) => {
    try {
      const ramas = await RamaDeportiva.find();
      res.json(ramas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener ramas' });
    }
  });

module.exports = router;
