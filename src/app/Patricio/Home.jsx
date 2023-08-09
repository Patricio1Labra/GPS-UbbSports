import React, { useState, useEffect  } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import "../Felipe/Home.css";
import TemporaryDrawer from '../Felipe/Comps/TemporaryDrawer.jsx';
import Chart from './Chart.jsx';
import Container from '@mui/material/Container';

export function Home1({ user, setUser }){
  
  if (!user) {
    return null; // No renderizar nada en este caso
  }

  const handleLogout = () => {
    setUser([]); // Reset user state
    localStorage.removeItem('user'); // Clear user data from localStorage
    window.location.href = '/'; // Redirect to login page
  };

  const [menuOpen, setMenuOpen] = useState("");

  const handleMenuClick = () => {
    console.log("handleMenuClick");
    setMenuOpen(!menuOpen);
  };

  return(
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="barra" style={{ color: 'white' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherent"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <TemporaryDrawer open={menuOpen} onClose={handleMenuClick} style={{ color: 'black' }} />
            </IconButton>
            <Typography className='texto1' variant="h6" style={{ color: 'white' }} component="div" sx={{ flexGrow: 1 }}>
            <center><span style={{ color: 'white' }}>Ramas,</span> <span style={{ color: 'white' }}>{user.nombre}</span></center>
            </Typography>
            <Button onClick={handleLogout} style={{ color: 'white' }} color="inherit">Cerrar Sesión</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="lg"  sx={{ mt: 4, mb: 4 }}>
            <Chart user={user} setUser={setUser}/>
          </Container>
    </div>
  );
} 
export default Home1;