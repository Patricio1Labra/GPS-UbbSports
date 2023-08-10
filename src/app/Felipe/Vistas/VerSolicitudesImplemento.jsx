import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import '../Home.css';
import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BlockIcon from '@mui/icons-material/Block';

export function VerSolicitudesImplemento(user, setUser) {
    
    const [solicitudes, setSolicitudes] = useState([]);
    const [botonesDeshabilitados, setBotonesDeshabilitados] = useState([]);
    useEffect(() => {
        // Hacer una solicitud GET al servidor para obtener la lista de solicitudes
        const fetchSolicitudes = async () => {
            try {
                const response = await fetch('/api/obtener-solicitudes'); // Ruta GET para obtener las solicitudes
                if (response.ok) {
                    const data = await response.json();
                    setSolicitudes(data);
                    const iniciaBotones = {};
                    data.forEach(solicitud =>{
                      iniciaBotones[solicitud._id] = false;
                    });
                    setBotonesDeshabilitados(iniciaBotones);
                } else {
                    console.error('Error al obtener las solicitudes de implementos');
                }
            } catch (error) {
                console.error('Error al obtener las solicitudes de implementos', error);
            }
        };
        fetchSolicitudes();
    }, []);
    const handleAceptarSolicitud = async (solicitud) => {
        try {
            const response = await fetch(`/api/solicitudImplementos/${solicitud.nombre}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estadosolicitud: 'Aceptada' }),
            });
    
            if (response.ok) {
                // Actualizar el estado de la solicitud en el frontend
                setBotonesDeshabilitados(prevState =>({
                  ...prevState,
                  [solicitud._id]: true
                }));
                const updatedSolicitudes = solicitudes.map((s) =>
                    s.nombre === solicitud.nombre ? { ...s, estadosolicitud: 'Aceptada' } : s
                );
                setSolicitudes(updatedSolicitudes);
            } else {
                console.error('Error al aceptar la solicitud');
            }
        } catch (error) {
            console.error('Error al aceptar la solicitud', error);
        }
    };
    const handleRechazarSolicitud = async (solicitud) => {
        try {
            const response = await fetch(`/api/solicitudImplementos/${solicitud.nombre}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estadosolicitud: 'Rechazada' }),
            });
    
            if (response.ok) {
                // Actualizar el estado de la solicitud en el frontend
                setBotonesDeshabilitados(prevState =>({
                  ...prevState,
                  [solicitud._id]: true
                }));
                const updatedSolicitudes = solicitudes.map((s) =>
                    s.nombre === solicitud.nombre ? { ...s, estadosolicitud: 'Rechazada' } : s
                );
                setSolicitudes(updatedSolicitudes);
            } else {
                console.error('Error al rechazar la solicitud');
            }
        } catch (error) {
            console.error('Error al rechazar la solicitud', error);
        }
    };
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/home-encargado">
            <ListItemIcon>
              <ArrowBackIcon />
            </ListItemIcon>
            <ListItemText primary="Volver" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: '#007bff' }}>
        <Toolbar>
          <Button onClick={toggleDrawer('left', true)}>
            <MenuIcon className="menu" style={{ color: 'white' }} />
          </Button>
          <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            Solicitud de Implementos
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={state.left} onClose={toggleDrawer('left', false)}>
        {list('left')}
      </Drawer>
      <center>
      <Box p={2}  justifyContent="center"minHeight="100vh">
      <div className="solicitudes-container-scroll">
      <div className="solicitudes-container">
  {solicitudes.map((solicitud, index) => (
    <div key={solicitud._id} className="solicitud-item">
      <div className="info">
      <Typography variant="h6">{solicitud.nombre}</Typography>
      <Typography>Descripción: {solicitud.descripcion}</Typography>
      <Typography>Cantidad: {solicitud.cantidad}</Typography>
      </div>
      <div className="info">
      <Typography>
        Fecha de Solicitud: {format(new Date(solicitud.fechadesolicitud), 'dd/MM/yyyy')}
      </Typography>
      <Typography>Estado de Solicitud: {solicitud.estadosolicitud}</Typography>
      </div>
      <div className="icon-container">
        {solicitud.estadosolicitud === 'Pendiente' && !botonesDeshabilitados[index] && (
          <div className="icon-wrapper">
            <CheckBoxIcon
              onClick={() => handleAceptarSolicitud(solicitud, index)}
              className="icon1"
              style={{ fontSize: 40, color: 'green' }}
            />
          </div>
        )}
        {solicitud.estadosolicitud === 'Pendiente' && !botonesDeshabilitados[index] && (
          <div className="icon-wrapper">
            <BlockIcon
              onClick={() => handleRechazarSolicitud(solicitud, index)}
              className="icon2"
              style={{ fontSize: 40, color: 'red' }}
            />
          </div>
        )}
        {solicitud.estadosolicitud === 'Aceptada' && (
          <CheckBoxIcon className="icon-aceptada" style={{ fontSize: 40, color: 'green' }} />
        )}
        {solicitud.estadosolicitud === 'Rechazada' && (
          <BlockIcon className="icon-rechazada" style={{ fontSize: 40, color: 'red' }} />
        )}
      </div>
    </div>
  ))}
</div>
</div>
      </Box>
      </center>
    </div>
  );
}
export default VerSolicitudesImplemento;