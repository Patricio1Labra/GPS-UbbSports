import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RegistrarAsistencia() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [selectedEntrenamiento, setSelectedEntrenamiento] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [asistenciaAlumnos, setAsistenciaAlumnos] = useState({});

  useEffect(() => {
    // Cargar datos de la base de datos al cargar el componente
    axios.get(`/api/entrenamientos/${id}`)
      .then(response => {
        setEntrenamientos(response.data);
      })
      .catch(error => {
        console.error('Error al cargar entrenamientos:', error);
      });

    axios.get(`/api/alumnos`)
      .then(response => {
        setAlumnos(response.data);
      })
      .catch(error => {
        console.error('Error al cargar alumnos:', error);
      });
  }, [id]);

  const handleEntrenamientoChange = (e) => {
    const entrenamientoId = e.target.value;
    const selected = entrenamientos.find((entrenamiento) => entrenamiento._id === entrenamientoId);
    setSelectedEntrenamiento(selected);
    setAsistenciaAlumnos({});
  };

  const handleAsistenciaChange = (alumnoId, isChecked) => {
    setAsistenciaAlumnos((prevAsistencia) => ({
      ...prevAsistencia,
      [alumnoId]: isChecked,
    }));
  };

  const handleSubmit = () => {
    if (selectedEntrenamiento) {
      // Enviar datos de asistencia a la base de datos
      const asistenciaData = {
        entrenamientoId: selectedEntrenamiento._id,
        asistencia: asistenciaAlumnos,
      };

      axios.put(`/api/actualizarAsistencia/${selectedEntrenamiento._id}`, asistenciaData)
      .then(response => {
        console.log('Asistencia actualizada:', response.data);
        // Redirigir al usuario a la página de inicio o a la ruta deseada
        navigate('/'); // Cambia '/'' a la ruta que desees
      })
      .catch(error => {
        console.error('Error al actualizar asistencia:', error);
      });
  }
};

  return (
    <div className="asistencia-container">
      <h2>Registro de Asistencia - Curso {id}</h2>
      <div>
        <label>
          Entrenamiento:
          <select onChange={handleEntrenamientoChange} value={selectedEntrenamiento ? selectedEntrenamiento._id : ''}>
            <option value="">Seleccione un entrenamiento</option>
            {entrenamientos.map((entrenamiento) => (
              <option key={entrenamiento._id} value={entrenamiento._id}>
                {`Fecha: ${entrenamiento.asistencia.fecha}, Hora Entrada: ${entrenamiento.horaEntrada}, Hora Salida: ${entrenamiento.horaSalida}`}
              </option>
            ))}
          </select>
        </label>
      </div>
      {selectedEntrenamiento && (
        <div>
          <h3>Detalles del Entrenamiento</h3>
          <p>{`Fecha: ${selectedEntrenamiento.asistencia.fecha}, Hora Entrada: ${selectedEntrenamiento.horaEntrada}, Hora Salida: ${selectedEntrenamiento.horaSalida}`}</p>
          <h3>Lista de Alumnos</h3>
          {alumnos.map((alumno) => (
            <div key={alumno._id} className="alumno-item">
              <label>
                <input
                  type="checkbox"
                  checked={asistenciaAlumnos[alumno._id] || false}
                  onChange={(e) => handleAsistenciaChange(alumno._id, e.target.checked)}
                />
                {alumno.nombre} - {alumno.carrera}
              </label>
            </div>
          ))}
          <button onClick={handleSubmit}>Guardar Asistencia</button>
        </div>
      )}
    </div>
  );
}

export default RegistrarAsistencia;