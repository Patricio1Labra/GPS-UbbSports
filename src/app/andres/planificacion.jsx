import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './edit.css';
import axios from 'axios';

function EditarEntrenamiento() {
  const { id } = useParams();
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [selectedEntrenamiento, setSelectedEntrenamiento] = useState(null);

  
  // Cargar los datos de la base de datos al montar el componente

  useEffect(() => {
    async function fetchEntrenamientos() {
      try {
        const response = await axios.get(`/api/obtenerEntrenamientosPorRama/${id}`);
        setEntrenamientos(response.data);
      } catch (error) {
        console.error('Error al cargar los entrenamientos:', error);
      }
    }

    fetchEntrenamientos();
  }, [id]);

  const handleEntrenamientoChange = (e) => {
    const entrenamientoId = parseInt(e.target.value);
    const selected = entrenamientos.find((entrenamiento) => entrenamiento.id === entrenamientoId);
    setSelectedEntrenamiento(selected);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEntrenamiento) {
      return;
    }

    try {
      await axios.put(`/api/actualizarEntrenamiento/${selectedEntrenamiento.id}`, selectedEntrenamiento);
      // Puedes mostrar una alerta de éxito aquí si lo deseas
    } catch (error) {
      console.error('Error al actualizar el Entrenamiento:', error);
      // Puedes mostrar una alerta de error aquí si lo deseas
    }
  };

  return (
    <div className="editar-entrenamiento-container">
      <h2>Editar Entrenamientos - Rama {id}</h2>
      <div>
        <label>
          Entrenamientos:
          <select
            onChange={handleEntrenamientoChange}
            value={selectedEntrenamiento ? selectedEntrenamiento.id : ''}
          >
            <option value="">Seleccione un Entrenamiento</option>
            {entrenamientos.map((entrenamiento) => (
  <           option key={entrenamiento.id} value={entrenamiento.id}>
                {`Dia: ${entrenamiento.asistencia.fecha}, Hora Inicio: ${entrenamiento.horaEntrada}, Hora Fin: ${entrenamiento.horaSalida}`}
              </option>
            ))}
          </select>
        </label>
      </div>
      {selectedEntrenamiento && (
        <div>
          <h3>Editar Entrenamiento</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Nueva hora de inicio:
              <input
                type="time"
                value={selectedEntrenamiento.horaEntrada}
                onChange={(e) =>
                  setSelectedEntrenamiento({ ...selectedEntrenamiento, horaEntrada: e.target.value })
                }
              />
            </label>
            <label>
              Nueva hora de fin:
              <input
                type="time"
                value={selectedEntrenamiento.horaSalida}
                onChange={(e) =>
                  setSelectedEntrenamiento({ ...selectedEntrenamiento, horaSalida: e.target.value })
                }
              />
            </label>
            <label>
              Nueva descripción:
              <textarea
                value={selectedEntrenamiento.descripcion}
                onChange={(e) =>
                  setSelectedEntrenamiento({ ...selectedEntrenamiento, descripcion: e.target.value })
                }
              />
            </label>
            <button type="submit">Guardar cambios</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditarEntrenamiento;