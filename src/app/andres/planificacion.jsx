import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './edit.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TemporaryDrawer from '../Felipe/Comps/TempEncargado.jsx';
import moment from 'moment';
import 'moment/locale/es'; // Configura el idioma para español

function EditarEntrenamiento({ user, setUser }) {
  const { id } = useParams();
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [editing, setEditing] = useState(false);
  const [selectedEntrenamiento, setSelectedEntrenamiento] = useState('');
  const [editEntrenamiento, setEditEntrenamiento] = useState({
    nombre: '',
    horaEntrada: '',
    horaSalida: '',
    descripcion: '',
  });

  const handleLogout = () => {
    setUser([]); // Reset user state
    localStorage.removeItem('user'); // Clear user data from localStorage
    window.location.href = '/'; // Redirect to login page
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

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

  const handleChange = (event) => {
    setSelectedEntrenamiento(event.target.value);
  };

  const handleEditClick = () => {
    setEditing(true);
    const selected = entrenamientos.find((entrenamiento) => entrenamiento._id === selectedEntrenamiento);
    if (selected) {
      setEditEntrenamiento(selected);
    }
  };

  const handleEntrenamientoChange = (event) => {
    const { name, value } = event.target;
    setEditEntrenamiento((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.get(`/api/obtenerEntrenamientosPorRama/${id}`);
    await axios
      .put(`/api/actualizarEntrenamiento/${selectedEntrenamiento.id}`, editEntrenamiento)
      .then((response) => {
        console.log('Data updated successfully:', response.data);
        setEditing(false);
        Swal.fire({
          icon: 'success',
          title: '¡Inscripción enviada!',
          text: 'La inscripción se ha enviado exitosamente.',
        });

        navigate('/ver-rama'); // Redirige a la página de inicio
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar la inscripción',
          text: 'Hubo un problema al enviar la inscripción. Por favor, inténtalo nuevamente.',
        });
      });
  };
  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  };

  // Función para formatear la hora a 'h/m/s'
  const formatTime = (time) => {
    return moment(time, 'HH:mm:ss').format('HH:mm:ss');
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          {/* ... (código de la barra de navegación) */}
        </AppBar>
      </Box>
      <div className="editar-entrenamiento-container">
        <h2>Editar Entrenamientos - Rama {id}</h2>
        <div>
          {/* Selección del entrenamiento */}
          {/* ... (código de selección de entrenamiento) */}
        </div>
        {editing && (
          <div>
            <h3>Editar Entrenamiento</h3>
            <form onSubmit={handleSubmit}>
              {/* Campos de edición */}
              {/* ... (campos de edición) */}
            </form>
          </div>
        )}

        {/* Lista de entrenamientos */}
        <div>
          <h3>Lista de Entrenamientos</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre de Rama</th>
                <th>Fecha</th>
                <th>Hora de Inicio</th>
                <th>Hora de Fin</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {entrenamientos.map((entrenamiento) => (
                <tr key={entrenamiento._id}>
                  <td>{entrenamiento.nombreRama}</td>
                  <td>{formatDate(entrenamiento.asistencia.fecha)}</td>
                  <td>{formatTime(entrenamiento.horaEntrada)}</td>
                  <td>{formatTime(entrenamiento.horaSalida)}</td>
                  <td>{entrenamiento.descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EditarEntrenamiento;
