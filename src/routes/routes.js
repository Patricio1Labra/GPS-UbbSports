const express = require('express');
const router = express.Router();
const { Estudiante } = require('../models/modelo'); // Asegúrate de que la ruta sea correcta
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



module.exports = router;
