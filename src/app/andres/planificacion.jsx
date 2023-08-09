import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './edit.css';
import axios from 'axios';

function EditarEntrenamiento() {
  const { id } = useParams();
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [selectedEntrenamiento, setSelectedEntrenamiento] = useState(null);
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [nuevaHoraInicio, setNuevaHoraInicio] = useState('');
  const [nuevaHoraFin, setNuevaHoraFin] = useState('');
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');

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

    if (selected) {
      setSelectedEntrenamiento(selected);
      setNuevaFecha(selected.asistencia.fecha || '');
      setNuevaHoraInicio(selected.horaEntrada || '');
      setNuevaHoraFin(selected.horaSalida || '');
      setNuevaDescripcion(selected.descripcion || '');
    } else {
      setSelectedEntrenamiento(null);
      setNuevaFecha('');
      setNuevaHoraInicio('');
      setNuevaHoraFin('');
      setNuevaDescripcion('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEntrenamiento) {
      return;
    }

    try {
      const datosActualizados = {
        asistencia: {
          fecha: nuevaFecha,
          estado: selectedEntrenamiento.asistencia.estado,
        },
        horaEntrada: nuevaHoraInicio,
        horaSalida: nuevaHoraFin,
        descripcion: nuevaDescripcion,
      };

      await axios.put(`/api/actualizarEntrenamiento/${selectedEntrenamiento.id}`, datosActualizados);

      const response = await axios.get(`/api/obtenerEntrenamientosPorRama/${id}`);
      setEntrenamientos(response.data);

      setSelectedEntrenamiento(null);
      setNuevaFecha('');
      setNuevaHoraInicio('');
      setNuevaHoraFin('');
      setNuevaDescripcion('');

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
            {Array.isArray(entrenamientos) ? (
              entrenamientos.map((entrenamiento) => (
                <option key={entrenamiento.id} value={entrenamiento.id}>
                  {`Dia: ${entrenamiento.asistencia.fecha}, Hora Inicio: ${entrenamiento.horaEntrada}, Hora Fin: ${entrenamiento.horaSalida}`}
                </option>
              ))
            ) : (
              <option value="">No hay entrenamientos disponibles</option>
            )}
          </select>
        </label>
      </div>
      {selectedEntrenamiento && (
        <div>
          <h3>Editar Entrenamiento</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Nueva Fecha:
              <input
                type="date"
                value={nuevaFecha}
                onChange={(e) => setNuevaFecha(e.target.value)}
              />
            </label>
            <label>
              Nueva hora de inicio:
              <input
                type="time"
                value={nuevaHoraInicio}
                onChange={(e) => setNuevaHoraInicio(e.target.value)}
              />
            </label>
            <label>
              Nueva hora de fin:
              <input
                type="time"
                value={nuevaHoraFin}
                onChange={(e) => setNuevaHoraFin(e.target.value)}
              />
            </label>
            <label>
              Nueva descripción:
              <textarea
                value={nuevaDescripcion}
                onChange={(e) => setNuevaDescripcion(e.target.value)}
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