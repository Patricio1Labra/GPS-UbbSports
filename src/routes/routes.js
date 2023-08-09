const express = require('express');
const router = express.Router();
const {Estudiante} = require('../models/modelo');
const {Encargado} = require('../models/modelo');
const {Entrenador} = require('../models/modelo');
const {SolicitudImplementos,RecintoDeportivo,SolicitudRecinto} = require('../models/modelo');

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
    const { motivo, estudiante, fechaparausar, estadosolicitud, RecintoDeportivo } = req.body;

    try {
        const nuevaSolicitudRecinto = new SolicitudRecinto({
            motivo,
            estudiante,
            fechadesolicitud: new Date(),
            fechaparausar: new Date(fechaparausar),
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

router.get('/estudiantes', async (req, res) => {
  try {
      const modelos = await Estudiante.find().exec();
      console.log(modelos);
      res.json(modelos); 
  } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor'); 
  }
});

router.get('/encargados', async (req, res) => {
  try {
      const modelos = await Encargado.find().exec();
      console.log(modelos);
      res.json(modelos); 
  } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor'); 
  }
});

router.get('/entrenadores', async (req, res) => {
  try {
      const modelos = await Entrenador.find().exec();
      console.log(modelos);
      res.json(modelos); 
  } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor'); 
  }
}); 
router.post('/login', async (req, res) => {
  const { rut, password } = req.body;

  try {
    const estudiante = await Estudiante.findOne({ rut, contraseña: password }).exec();
    const entrenador = await Entrenador.findOne({ rut, contraseña: password }).exec();
    const encargado = await Encargado.findOne({ rut, contraseña: password }).exec();

    let user = null;

    if (estudiante) {
      user = estudiante;
    } else if (entrenador) {
      user = entrenador;
    } else if (encargado) {
      user = encargado;
    }

    if (user) {
      res.json(user);
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});


router.post('/encargadospost', async (req, res) => {
    try {
        const nuevoModelo = new Encargado(req.body); // Suponiendo que estás pasando los datos en el cuerpo de la solicitud (req.body)
        const resultado = await nuevoModelo.save();
        console.log('Nuevo modelo guardado:', resultado);
        res.status(201).send(resultado); // 201: Created
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});
router.post('/Estudiantepost', async (req, res) => {
    try {
        const nuevoModelo = new Estudiante(req.body); // Suponiendo que estás pasando los datos en el cuerpo de la solicitud (req.body)
        const resultado = await nuevoModelo.save();
        console.log('Nuevo modelo guardado:', resultado);
        res.status(201).send(resultado); // 201: Created
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});
router.post('/entrenadorespost', async (req, res) => {
    try {
        const nuevoModelo = new Entrenador(req.body); // Suponiendo que estás pasando los datos en el cuerpo de la solicitud (req.body)
        const resultado = await nuevoModelo.save();
        console.log('Nuevo modelo guardado:', resultado);
        res.status(201).send(resultado); // 201: Created
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});

router.post('/solicitudImplementos', async (req, res) => {
  const { nombre, descripcion, cantidad } = req.body;
  const estadosolicitud= "Pendiente";
  const fechadesolicitud= new Date();
  try {
      // Validar campos requeridos
      if (!nombre || !descripcion || !cantidad) {
          return res.status(400).json({ error: 'Faltan campos obligatorios en la solicitud' });
      }

      // Validar que cantidad sea mayor que cero
      if (cantidad <= 0) {
      return res.status(400).json({ error: 'El campo "cantidad" debe ser mayor que cero' });
      }

      // Validar longitud de texto para nombre 
      if (nombre.length < 3 || nombre.length > 50) {
          return res.status(400).json({ error: 'El campo "nombre" debe tener entre 3 y 50 caracteres' });
      }

      // Validar que fechadesolicitud sea una fecha válida
      if (isNaN(Date.parse(fechadesolicitud))) {
          return res.status(400).json({ error: 'El campo "fechadesolicitud" no es una fecha válida' });
      }

      // Crear una nueva instancia del modelo de solicitud con los datos recibidos
      const Solicitudimplementos = new SolicitudImplementos({
          nombre,
          descripcion,
          cantidad,
          fechadesolicitud,
          estadosolicitud: estadosolicitud
      });

      // Guardar la solicitud en la base de datos
      await Solicitudimplementos.save();
      console.log('Solicitud de implementos creada exitosamente');
      res.status(201).json({ message: 'Solicitud de implementos creada exitosamente' });
  }catch(error) {
      console.error('Error al crear la solicitud de implementos', error);
      res.status(500).json({ error: 'Error al crear la solicitud de implementos' });
  }

});
module.exports = router;

  
