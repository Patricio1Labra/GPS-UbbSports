import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './edit.css';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import "../Felipe/Home.css";
import TemporaryDrawer from '../Felipe/Comps/TempEncargado.jsx';


function EditarEntrenamiento({ user, setUser }) {
  const { id } = useParams();
  const [entrenamientos, setEntrenamientos] = useState([]);
  const [selectedEntrenamiento, setSelectedEntrenamiento] = useState([]);
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

  const handleLogout = () => {
    setUser([]); // Reset user state
    localStorage.removeItem('user'); // Clear user data from localStorage
    window.location.href = '/'; // Redirect to login page
  };
  const [menuOpen, setMenuOpen] = useState("");
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };




  const handleEntrenamientoChange = (e) => {
    const entrenamientoId = e.target.value;
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
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="barra" style={{ color: 'white' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <TemporaryDrawer open={menuOpen} onClose={handleMenuClick} style={{ color: 'black' }} />
            </IconButton>
            <Typography className='texto1' variant="h6" style={{ color: 'white' }} component="div" sx={{ flexGrow: 1 }}>
              <center><span style={{ color: 'white' }}>Bienvenido,</span> <span style={{ color: 'white' }}>{user.nombre}</span></center>
            </Typography>
            <Button onClick={handleLogout} style={{ color: 'white' }} color="inherit">Cerrar Sesión</Button>
          </Toolbar>
        </AppBar>
      </Box>
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
    </div>
  );
}

export default EditarEntrenamiento;