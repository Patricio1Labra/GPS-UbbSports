import axios from 'axios';
import React, { useState, useEffect } from 'react';
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
const GestionarSolicitudesRecursos = ({ user, setUser }) => {
    const [solicitudesRecursos, setSolicitudesRecursos] = useState([]);

    useEffect(() => {
        fetchSolicitudesRecursos();
    }, []);

    const fetchSolicitudesRecursos = async () => {
        try {
            const response = await axios.get('/api/recursos');
            setSolicitudesRecursos(response.data);
        } catch (error) {
            console.error('Error fetching solicitudesRecursos', error);
        }
    };

    const handleAprobar = async (solicitudId) => {
        try {
            await axios.put(`/api/recursos/${solicitudId}`, { estadoSolicitud: "Aprobada" });
            fetchSolicitudesRecursos();
        } catch (error) {
            console.error('Error al cambiar el estado de la solicitud', error);
        }
    };

    const handleRechazar = async (solicitudId) => {
        try {
            await axios.put(`/api/recursos/${solicitudId}`, { estadoSolicitud: "Rezachada" });
            fetchSolicitudesRecursos();
        } catch (error) {
            console.error('Error al cambiar el estado de la solicitud', error);
        }
    };
    
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
        <div className="container mt-5">
            <h2>Gestionar Solicitudes de Recursos</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre Solicitante</th>
                        <th>Monto</th>
                        <th>Descripción</th>
                        <th>Rama Solicitante</th>
                        <th>Participantes</th>
                        <th>Estado de la solicitud</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {solicitudesRecursos.map((solicitud, index) => (
                        <tr key={index}>
                            <td>{solicitud.nombreSolicitante}</td>
                            <td>{solicitud.monto}</td>
                            <td>{solicitud.descripcion}</td>
                            <td>{solicitud.ramaSolicitante}</td>
                            <td>{solicitud.participantes.join(', ')}</td>
                            <td>{solicitud.estadoSolicitud}</td>
                            <td>
                                <div>
                                    <button
                                        className="btn btn-success mr-2"
                                        onClick={() => handleAprobar(solicitud._id, 'aprobado')}
                                        >
                                        Aprobar
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleRechazar(solicitud._id, 'rechazado')}
                                    >
                                        Rechazar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default GestionarSolicitudesRecursos;