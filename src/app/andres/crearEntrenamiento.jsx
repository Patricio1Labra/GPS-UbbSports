import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importa SweetAlert
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './edit.css';
import { Button, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import "../Felipe/Home.css";
import TemporaryDrawer from '../Felipe/Comps/TempEncargado.jsx';


function CrearEntrenamiento({ user, setUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaTermino, setHoraTermino] = useState('');
  const [descripcion, setDescripcion] = useState('');



  const handleLogout = () => {
    setUser([]); // Reset user state
    localStorage.removeItem('user'); // Clear user data from localStorage
    window.location.href = '/'; // Redirect to login page
  };
  const [menuOpen, setMenuOpen] = useState("");
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };


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

      navigate('/ver-rama'); // Redirige a la página de inicio
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
    </div>
  );
}

export default CrearEntrenamiento;