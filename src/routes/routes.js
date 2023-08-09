const express = require('express');
const router = express.Router();
const { RamaDeportiva, RecintoDeportivo } = require('../models/modelo');


/////////////////////////////LEO////////////////////////////////////////////////////
router.post('/inscripciones', async (req, res) => {
    try {
        const {
            alumnos,
            nombre,
            descripcion,
            entrenador,
            horarioDia,
            horarioInicio,
            horarioSalida,
            cupos,
            recinto,
            entrenamiento,
        } = req.body;

        const nuevaInscripcion = new RamaDeportiva({
            alumnos,
            nombre,
            descripcion,
            entrenador,
            horario: {
                dia: horarioDia,
                horaInicio: horarioInicio,
                horaSalida: horarioSalida,
            },
            cupos,
            recinto,
            entrenamiento,
        });

        await nuevaInscripcion.save();
        res.status(201).json({ message: 'Inscripción realizada con éxito' });
    } catch (error) {
        console.error('Error al guardar la inscripción:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

router.get('/ramasDeportivas', async (req, res) => {
    try {
        // Obtiene solo el nombre de las ramas
        const ramas = await RamaDeportiva.find({}, 'nombre');
        res.json(ramas);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Error fetching data' });
    }
});

router.put('/ramasDeportivas/:nombre', async (req, res) => {
    const nombreRama = req.params.nombre;
    const nuevoData = req.body;

    try {
        await RamaDeportiva.findOneAndUpdate({ nombre: nombreRama }, nuevoData);
        res.json({ message: 'Data updated successfully' });
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ message: 'Error updating data' });
    }
});

router.get('/recintosDeportivos', async (req, res) => {
    try {
        const recintos = await RecintoDeportivo.find();
        res.json(recintos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los recintos deportivos' });
    }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////  



router.get('/', async (req, res) => {
    try {
        const modelos = await RamaDeportiva.find().exec();
        console.log(modelos);
        res.json(modelos);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});
router.get('/:id', async (req, res) => {
    try {
        const modelo = await RamaDeportiva.findById().exec();
        console.log(modelo);
        res.json(modelo);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});

router.post('/', async (req, res) => {
    try {
        const nuevoModelo = new RecintoDeportivo(req.body); // Suponiendo que estás pasando los datos en el cuerpo de la solicitud (req.body)
        const resultado = await nuevoModelo.save();
        console.log('Nuevo modelo guardado:', resultado);
        res.status(201).send(resultado); // 201: Created
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const nuevoModelo = new RamaDeportiva(req.body);
        const resultado = await RamaDeportiva.findByIdAndUpdate(id, nuevoModelo);

        if (resultado) {
            console.log('Modelo eliminado:', resultado);
            res.send(resultado);
        } else {
            res.status(404).send('No se encontró el modelo');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const resultado = await RamaDeportiva.findByIdAndUpdate(id);

        if (resultado) {
            console.log('Modelo eliminado:', resultado);
            res.send(resultado);
        } else {
            res.status(404).send('No se encontró el modelo');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});


module.exports = router;