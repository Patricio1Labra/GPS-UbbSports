import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './edit.css';
import axios from 'axios';

function EditarEntrenamiento() {
  const { id } = useParams();
  const [reservas, setReservas] = useState([]);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [editMode, setEditMode] = useState(false); // Nuevo estado para el modo de edición

  
  // Cargar los datos de la base de datos al montar el componente
  useEffect(() => {
    async function fetchReservas() {
      try {
        const response = await axios.get(`/api/obtenerReservasPorCurso/${id}`);
        setReservas(response.data);
      } catch (error) {
        console.error('Error al cargar las reservas:', error);
      }
    }
  
    fetchReservas();
  }, [id]);

  const handleReservaChange = (e) => {
    const reservaId = parseInt(e.target.value);
    const selected = reservas.find((reserva) => reserva.id === reservaId);
    setSelectedReserva(selected);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedReserva) {
      return;
    }

    try {
      await axios.put(`/api/actualizarReserva/${selectedReserva.id}`, selectedReserva);
      // Puedes mostrar una alerta de éxito aquí si lo deseas
    } catch (error) {
      console.error('Error al actualizar el Entrenamiento:', error);
      // Puedes mostrar una alerta de error aquí si lo deseas
    }
  };

  return (
    <div className="editar-entrenamiento-container">
      <h2>Editar Entrenamiento - Curso {id}</h2>
      <div>
        <label>
          Reservas:
          <select
            onChange={handleReservaChange}
            value={selectedReserva ? selectedReserva.id : ''}
          >
            <option value="">Seleccione un Entrenamiento</option>
            {reservas.map((reserva) => (
              <option key={reserva.id} value={reserva.id}>
                {`Dia: ${reserva.asistencia.fecha}, Hora Inicio: ${reserva.horaEntrada}, Hora Fin: ${reserva.horaSalida}`}
              </option>
            ))}
          </select>
        </label>
      </div>
      {selectedReserva && (
        <div>
          <h3>Editar Entrenamiento</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Nueva hora de inicio:
              <input
                type="time"
                value={selectedReserva.horaEntrada}
                onChange={(e) =>
                  setSelectedReserva({ ...selectedReserva, horaEntrada: e.target.value })
                }
              />
            </label>
            <label>
              Nueva hora de fin:
              <input
                type="time"
                value={selectedReserva.horaSalida}
                onChange={(e) =>
                  setSelectedReserva({ ...selectedReserva, horaSalida: e.target.value })
                }
              />
            </label>
            <label>
              Nueva descripción:
              <textarea
                value={selectedReserva.descripcion}
                onChange={(e) =>
                  setSelectedReserva({ ...selectedReserva, descripcion: e.target.value })
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