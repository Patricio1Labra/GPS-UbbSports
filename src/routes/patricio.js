const express = require('express');
const router = express.Router();
const {
  Estudiante,
  RamaDeportiva
} = require('../models/modelo'); // Asegúrate de proporcionar la ruta correcta a tus modelos

router.get('/estudiantes', async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estudiantes' });
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

  router.get('/estudiantes/:id', async (req, res) => {
    try {
      const estudianteId = req.params.id;
      const estudiante = await Estudiante.findById(estudianteId);
      
      if (!estudiante) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }
      
      res.json(estudiante);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener estudiante' });
    }
  });
  
  router.get('/ramas/:id', async (req, res) => {
    try {
      const ramaId = req.params.id;
      const rama = await RamaDeportiva.findById(ramaId);
      
      if (!rama) {
        return res.status(404).json({ message: 'Rama no encontrada' });
      }
      
      res.json(rama);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener rama' });
    }
  });

  router.post('/estudiantes', async (req, res) => {
    try {
      const nuevoEstudiante = await Estudiante.create(req.body);
      res.status(201).json(nuevoEstudiante);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear estudiante' });
    }
  });

  router.post('/:estudianteId/agregarRama', async (req, res) => {
    try {
      const { id, nombre, descripcion, entrenador, horario, recinto } = req.body;
      const estudianteId = req.params.estudianteId;
  
      const updatedEstudiante = await Estudiante.findByIdAndUpdate(
        estudianteId,
        {
          $push: {
            ramaDeportiva: {
              _id: id,
              nombre,
              descripcion,
              entrenador,
              horario,
              recinto
            }
          }
        },
        { new: true }
      );
  
      res.json(updatedEstudiante);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Eliminar una rama deportiva de un estudiante por índice en el array
  router.delete('/:estudianteId/eliminarRama/:ramaIndex', async (req, res) => {
    try {
      const estudianteId = req.params.estudianteId;
      const ramaIndex = req.params.ramaIndex;
  
      const updatedEstudiante = await Estudiante.findByIdAndUpdate(
        estudianteId,
        { $pull: { ramaDeportiva: { _id: ramaIndex } } },
        { new: true }
      );
  
      res.json(updatedEstudiante);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post('/ramas/:ramaId/agregarAlumno', async (req, res) => {
    try {
      const ramaId = req.params.ramaId;
      const { nombreEstudiante } = req.body;
  
      // Buscar la rama deportiva por su ID
      const rama = await RamaDeportiva.findById(ramaId);
  
      if (!rama) {
        return res.status(404).json({ mensaje: 'Rama deportiva no encontrada' });
      }
  
      // Agregar el nombre del estudiante al arreglo de alumnos
      rama.alumnos.push(nombreEstudiante);
  
      // Guardar la rama deportiva actualizada en la base de datos
      const ramaActualizada = await rama.save();
  
      res.json(ramaActualizada);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al agregar alumno', error: error.message });
    }
  });

  router.delete('/ramas/:ramaId/eliminarAlumno/:nombreEstudiante', async (req, res) => {
    try {
      const ramaId = req.params.ramaId;
      const nombreEstudiante = req.params.nombreEstudiante;
  
      // Buscar la rama deportiva por su ID
      const rama = await RamaDeportiva.findById(ramaId);
  
      if (!rama) {
        return res.status(404).json({ mensaje: 'Rama deportiva no encontrada' });
      }
  
      // Eliminar el alumno del arreglo de alumnos
      rama.alumnos = rama.alumnos.filter(alumno => alumno !== nombreEstudiante);
  
      // Guardar la rama deportiva actualizada en la base de datos
      const ramaActualizada = await rama.save();
  
      res.json(ramaActualizada);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar alumno', error: error.message });
    }
  });

module.exports = router;