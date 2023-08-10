const express = require('express');
const router = express.Router();
const { Estudiante } = require('../models/modelo');
const { Encargado } = require('../models/modelo');
const { Entrenador } = require('../models/modelo');
const { SolicitudImplementos, RecintoDeportivo, SolicitudRecinto } = require('../models/modelo');
const { RamaDeportiva, TipoEspacio, Recursos } = require('../models/modelo');
const { Asistencia } = require('../models/modelo');
const moment = require('moment'); // Importa el paquete moment

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


////////////////////////////////////////pipe y jorge////////////////////////////////////////////////////////////////  

router.get('/tipos', async (req, res) => {
    try {
        const tipos = await TipoEspacio.find();
        res.json(tipos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los tipos de espacios' });
    }
});

// Ruta para agregar un nuevo tipo de espacio
router.post('/tipos', async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const nuevoTipo = new TipoEspacio({ nombre, descripcion });
        await nuevoTipo.save();
        res.status(201).json({ message: 'Tipo de espacio creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el tipo de espacio' });
    }
});

module.exports = router;

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

router.put('/solicitudImplementos/:nombre', async (req, res) => {
    const nombre = req.params.nombre;
    const nuevoEstado = req.body.estadosolicitud;

    try {
        const solicitudActualizada = await SolicitudImplementos.findOneAndUpdate(
            { nombre: nombre },
            { estadosolicitud: nuevoEstado },
            { new: true }
        );

        if (!solicitudActualizada) {
            return res.status(404).json({ error: 'Solicitud no encontrada' });
        }

        res.status(200).json(solicitudActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al actualizar la solicitud' });
    }
});
router.get('/obtener-solicitudes', async (req, res) => {
    try {
        const solicitudes = await SolicitudImplementos.find();
        res.status(200).json(solicitudes);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al obtener las solicitudes.' });
    }
});
///////////////////////////////////////BENJA////////////////////////////////////////////////////
router.post('/solicitudDeImplementos', async (req, res) => {
    const { nombre, descripcion, cantidad } = req.body;
    const estadosolicitud = "Pendiente";
    const fechadesolicitud = new Date();
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
    } catch (error) {
        console.error('Error al crear la solicitud de implementos', error);
        res.status(500).json({ error: 'Error al crear la solicitud de implementos' });
    }
});

router.post('/recursos', async (req, res) => {
    const { nombreSolicitante, monto, descripciondeSolicitud, ramaSolicitante, participantes } = req.body;
    const estadoSolicitud = "Pendiente";
    try {
        // Validar campos requeridos y longitud de texto
        if (!nombreSolicitante || !monto || !descripciondeSolicitud || !ramaSolicitante || !participantes) {
            return res.status(400).json({ error: 'Faltan campos obligatorios en la solicitud' });
        }

        if (nombreSolicitante.length < 3 || nombreSolicitante.length > 50) {
            return res.status(400).json({ error: 'El campo "nombreSolicitante" debe tener entre 3 y 50 caracteres' });
        }

        if (descripciondeSolicitud.length > 100) {
            return res.status(400).json({ error: 'El campo "descripciondeSolicitud" no puede exceder los 100 caracteres' });
        }

        if (ramaSolicitante.length < 3 || ramaSolicitante.length > 20) {
            return res.status(400).json({ error: 'El campo "ramaSolicitante" debe tener entre 3 y 20 caracteres' });
        }

        // Validar que monto sea mayor que cero
        if (monto <= 0) {
            return res.status(400).json({ error: 'El campo "monto" debe ser mayor que cero' });
        }

        // Crear una nueva instancia del modelo de recursos con los datos recibidos
        const recursos = new Recursos({
            nombreSolicitante,
            monto,
            descripciondeSolicitud,
            ramaSolicitante,
            participantes,
            estadoSolicitud
        });

        // Guardar la solicitud de recursos en la base de datos
        await recursos.save();
        console.log('Solicitud de recursos creada exitosamente');
        res.status(201).json({ message: 'Solicitud de recursos creada exitosamente' });
    } catch (error) {
        console.error('Error al crear la solicitud de recursos', error);
        res.status(500).json({ error: 'Error al crear la solicitud de recursos' });
    }
});

router.get('/recursos', async (req, res) => {
    try {
        const solicitudes = await Recursos.find(); // Obtener todas las solicitudes de la base de datos
        res.status(200).json(solicitudes);
    } catch (error) {
        console.error('Error al obtener las solicitudes de recursos', error);
        res.status(500).json({ error: 'Error al obtener las solicitudes de recursos' });
    }
});

router.put('/recursos/:id', async (req, res) => {
    try {
        const solicitudId = req.params.id;
        const nuevoEstado = req.body.estadoSolicitud;

        // Actualizar el estado de la solicitud en la base de datos
        const actualizacion = await Recursos.findByIdAndUpdate(solicitudId, { estadoSolicitud: nuevoEstado }, { new: true });

        if (!actualizacion) {
            return res.status(404).json({ error: 'Solicitud no encontrada' });
        }

        res.status(200).json(actualizacion);
    } catch (error) {
        console.error('Error al cambiar el estado de la solicitud', error);
        res.status(500).json({ error: 'Error al cambiar el estado de la solicitud' });
    }
});

//////////////////////////////////////ANDRES/////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////LUSHO/////////////////////////////////////
router.get('/estudiantes1/:id', async (req, res) => {
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


router.get('/estudiantes1/:id/ramas', async (req, res) => {
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




module.exports = router;


