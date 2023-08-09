
import React, { useState, useEffect  } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import "./Home.css";
import TemporaryDrawer from './Comps/TempEntrenador.jsx';

export function HomeEntrenador({ user, setUser }) {

  const handleLogout = () => {
    setUser([]); // Resetea el user
    localStorage.removeItem('user'); // limpia el user de localStorage
    window.location.href = '/'; // Redirije a Formulario
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
    </div>
  );
}
export default HomeEntrenador;