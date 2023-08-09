import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './edit.css';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importa SweetAlert

function CrearEntrenamiento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaTermino, setHoraTermino] = useState('');
  const [descripcion, setDescripcion] = useState('');






  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!fecha || !horaInicio || !horaTermino || !descripcion) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos antes de guardar.',
      });
      return;
    }
  
    try {
      await axios.post(`/api/crearEntrenamientos/${id}`, {
        fecha,
        horaInicio,
        horaTermino,
        descripcion,
      });
  
      // Mostrar alerta de éxito con SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Guardado exitoso',
        text: 'El entrenamiento ha sido guardado correctamente.',
      });
  
      navigate('/'); // Redirige a la página de inicio
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar',
        text: 'Ha ocurrido un error al intentar guardar el entrenamiento.',
      });
    }
  };

  return (
    <div className="crear-entrenamiento-container">
      <h2>Crear Entrenamiento -Curso {id}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Fecha:
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </label>
        <label>
          Hora Inicio:
          <input
            type="time"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
          />
        </label>
        <label>
          Hora Término:
          <input
            type="time"
            value={horaTermino}
            onChange={(e) => setHoraTermino(e.target.value)}
          />
        </label>
        <label>
          Descripción:
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </label>
        <button type="submit">Guardar entrenamiento</button>
      </form>
    </div>
  );
}

export default CrearEntrenamiento;