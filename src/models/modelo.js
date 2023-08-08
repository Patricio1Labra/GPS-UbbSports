
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Esquema para Entrenador
const EntrenadorSchema = new Schema({
  nombre: String,
  correo: String,
  rut: String,
  ramaDeportiva: String,
  telefono: String,
  descripcion: String,
  contraseña: String
});

// Esquema para Solicitud de Implementos
const SolicitudImplementosSchema = new Schema({
  nombre: String,
  descripcion: String,
  cantidad: Number,
  fechadesolicitud: Date,
  estadosolicitud: String
});

// Esquema para Estudiante
const EstudianteSchema = new Schema({
  nombre: String,
  carrera: String,
  correo: String,
  rut: String,
  telefono: String,
  descripcion: String,
  contraseña: String,
  ramaDeportiva: String,
  implementosSolicitados: [String],
  recintoSolicitado: String
});

// Esquema para Recinto Deportivo
const RecintoDeportivoSchema = new Schema({
  nombre: String,
  tipo: String
});

// Esquema para Entrenamiento
const EntrenamientoSchema = new Schema({
  asistencia: [String],
  duracion: String,
  descripcion: String
});

// Esquema para Encargado
const EncargadoSchema = new Schema({
  nombre: String,
  rut: String,
  descripcion: String,
  contraseña: String,
  ramaCreada: String,
  solicitudesImplementos: [String],
  solicitudesRecintos: [String]
});

// Esquema para Rama Deportiva
const RamaDeportivaSchema = new Schema({
  alumnos: [String],
  nombre: String,
  descripcion: String,
  entrenador: String,
  horario: String,
  cupos: Number,
  asistencia: [String],
  recinto: String,
  entrenamiento: String
});

// Esquema para Recursos
const RecursosSchema = new Schema({
  nombreSolicitante: String,
  monto: Number,
  descripciondeSolicitud: String,
  ramaSolicitante: String,
  participantes: [String]
});

// Modelos basados en los esquemas
const Entrenador = mongoose.model('Entrenador', EntrenadorSchema);
const SolicitudImplementos = mongoose.model('SolicitudImplementos', SolicitudImplementosSchema);
const Estudiante = mongoose.model('Estudiante', EstudianteSchema);
const RecintoDeportivo = mongoose.model('RecintoDeportivo', RecintoDeportivoSchema);
const Entrenamiento = mongoose.model('Entrenamiento', EntrenamientoSchema);
const Encargado = mongoose.model('Encargado', EncargadoSchema);
const RamaDeportiva = mongoose.model('RamaDeportiva', RamaDeportivaSchema);
const Recursos = mongoose.model('Recursos', RecursosSchema);

// Exportar los modelos
module.exports = {
  Entrenador,
  SolicitudImplementos,
  Estudiante,
  RecintoDeportivo,
  Entrenamiento,
  Encargado,
  RamaDeportiva,
  Recursos
};
