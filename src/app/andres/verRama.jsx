
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './edit.css';
import { Button, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import "../Felipe/Home.css";
import TemporaryDrawer from '../Felipe/Comps/TempEncargado.jsx';



function VerRama({ user, setUser }) {
  const [ramas, setRamas] = useState([]); // Estado para almacenar las ramas deportivas

  useEffect(() => {
    async function fetchRamas() {
      try {
        const response = await axios.get('/api/obtenerRamas'); // Hacer una solicitud para obtener las ramas deportivas desde tu API
        setRamas(response.data); // Establecer las ramas deportivas en el estado
      } catch (error) {
        console.error('Error al cargar las ramas deportivas:', error);
      }
    }

    fetchRamas();
  }, []);

  const handleLogout = () => {
    setUser([]); // Reset user state
    localStorage.removeItem('user'); // Clear user data from localStorage
    window.location.href = '/'; // Redirect to login page
  };
  const [menuOpen, setMenuOpen] = useState("");
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
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
      <div className="app">
        <header>
          <h1>UBB Sports</h1>
        </header>
        <main>
          <div className="courses-container">
            {ramas.map((rama) => (
              <div key={rama._id} className="course">
                <h2>{rama.nombre}</h2>
                <p>{rama.descripcion}</p>
                <div className="course-buttons">
                  <Link to={`/crear-entrenamiento/${rama.nombre}`}>
                    <button>Crear Entrenamiento</button>
                  </Link>
                  <Link to={`/editar-entrenamiento/${rama.nombre}`}>
                    <button>Editar Entrenamiento</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
        <footer>
          <p>© 2023 UBB Sports</p>
        </footer>
      </div>
    </div>
  );
}

export default VerRama;