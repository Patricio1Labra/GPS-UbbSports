const express = require('express');
const router = express.Router();
const {Estudiante} = require('../models/modelo');
const {Encargado} = require('../models/modelo');
const {Entrenador} = require('../models/modelo');

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



  
module.exports = router;