import React from 'react';
import { useParams } from 'react-router-dom';

function VerOpciones() {
  const { id } = useParams();

  const handleAttendance = () => {
    // Lógica para registrar asistencia
    console.log(`Registrando asistencia para el curso ${id}`);
  };

  const handleCreateTraining = () => {
    // Lógica para crear entrenamiento
    console.log(`Creando entrenamiento para el curso ${id}`);
  };

  const handleEditTraining = () => {
    // Lógica para editar entrenamiento
    console.log(`Editando entrenamiento para el curso ${id}`);
  };

  return (
    <div className="course-detail">
      <h2>Curso {id}</h2>
      <button onClick={handleAttendance}>Registrar Asistencia</button>
      <button onClick={handleCreateTraining}>Crear Entrenamiento</button>
      <button onClick={handleEditTraining}>Editar Entrenamiento</button>
    </div>
  );
}

export default VerOpciones;