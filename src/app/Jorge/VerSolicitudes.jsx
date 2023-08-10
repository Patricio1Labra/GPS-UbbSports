import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import "../Felipe/Home.css";
import TemporaryDrawer from '../Felipe/Comps/TempEncargado.jsx';

const SolicitudesRecintos = ({ user, setUser }) => {
    const [solicitudes, setSolicitudes] = useState([]);
    const navigate = useNavigate();
    const handleLogout = () => {
        setUser([]); // Reset user state
        localStorage.removeItem('user'); // Clear user data from localStorage
        window.location.href = '/'; // Redirect to login page
    };
    const [menuOpen, setMenuOpen] = useState("");
    const handleMenuClick = () => {
      setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const fetchSolicitudes = async () => {
            try {
                const response = await axios.get('/api/solicitudes-recintos');
                setSolicitudes(response.data);
            } catch (error) {
                console.error('Error al obtener las solicitudes de recintos', error);
            }
        };
        fetchSolicitudes();
    }, []);

    const handleRechazar = async (solicitudId) => {
        try {
            await axios.put(`/api/solicitudes-recintos/${solicitudId}`, { estadosolicitud: 'Rechazada' });
            actualizarEstadoSolicitud(solicitudId, 'Rechazada');
            mostrarAlerta('Solicitud rechazada exitosamente', 'success');
        } catch (error) {
            console.error('Error al rechazar la solicitud', error);
            mostrarAlerta('Hubo un error al rechazar la solicitud', 'error');
        }
    };

    const handleAceptar = async (solicitudId) => {
        try {
            await axios.put(`/api/solicitudes-recintos/${solicitudId}`, { estadosolicitud: 'Aceptada' });
            actualizarEstadoSolicitud(solicitudId, 'Aceptada');
            mostrarAlerta('Solicitud aceptada exitosamente', 'success');
        } catch (error) {
            console.error('Error al aceptar la solicitud', error);
            mostrarAlerta('Hubo un error al aceptar la solicitud', 'error');
        }
    };

    const actualizarEstadoSolicitud = (solicitudId, nuevoEstado) => {
        setSolicitudes(prevSolicitudes =>
            prevSolicitudes.map(solicitud =>
                solicitud._id === solicitudId ? { ...solicitud, estadosolicitud: nuevoEstado } : solicitud
            )
        );
    };

    const mostrarAlerta = (mensaje, tipo) => {
        Swal.fire({
            icon: tipo,
            title: tipo === 'success' ? 'Éxito' : 'Error',
            text: mensaje,
            timer: 2000,
            timerProgressBar: true,
        });
    };

    return (
        <Box sx={{ overflowX: 'auto', overflowY: 'auto', height: '100vh' }}>
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
            <center><span style={{ color: 'white' }}>Bienvenido,</span> <span style={{ color: 'white' }}>{user.nombre}</span></center>
            </Typography>
            <Button onClick={handleLogout} style={{ color: 'white' }} color="inherit">Cerrar Sesión</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="container mt-5">
            <h1><i
            className="fa-solid fa-circle-arrow-left"
            onClick={() => navigate('/home-encargado')}
            style={{ fontSize: '24px', color: 'gray', cursor: 'pointer' }}
        ></i> Solicitudes de Recintos</h1>
        
            <h2>Pendientes</h2>
            <div className="row">
                {solicitudes.filter(solicitud => solicitud.estadosolicitud === 'Pendiente').length === 0 ? (
                    <h4>No hay solicitudes pendientes.</h4>
                ) : (
                    solicitudes.filter(solicitud => solicitud.estadosolicitud === 'Pendiente').map(solicitud => (
                        <div className="col-md-4 mb-4" key={solicitud._id}>
                            <div className="card">
                                <div className="card-header">
                                    <h4>Solicitud de {solicitud.estudiante} </h4>
                                </div>
                                <div className="card-body">
                                    {/* Mostrar información de la solicitud */}
                                    <p><strong>Motivo:</strong> {solicitud.motivo}</p>
                                    <p><strong>Fecha de Solicitud:</strong> {new Date(solicitud.fechadesolicitud).toLocaleDateString()}</p>
                                    <p><strong>Fecha para Usar:</strong> {new Date(solicitud.fechaparausar).toLocaleDateString()} - {new Date(solicitud.fechaparausar).toLocaleTimeString()}</p>
                                    <p><strong>Estado:</strong> {solicitud.estadosolicitud}</p>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <button className="btn btn-danger" onClick={() => handleRechazar(solicitud._id)}>Rechazar</button>
                                    <button className="btn btn-success" onClick={() => handleAceptar(solicitud._id)}>Aceptar</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {/* Resto del código para mostrar las solicitudes Aceptadas y Rechazadas */}
            <h2>Aceptadas</h2>
            <div className="row">
                {solicitudes.filter(solicitud => solicitud.estadosolicitud === 'Aceptada').length === 0 ? (
                    <h4>No hay solicitudes aceptadas.</h4>
                ) : (
                    solicitudes.filter(solicitud => solicitud.estadosolicitud === 'Aceptada').map(solicitud => (
                        <div className="col-md-4 mb-4" key={solicitud._id}>
                            <div className="card">
                                <div className="card-header">
                                <h4>Solicitud de {solicitud.estudiante} </h4>
                                </div>
                                <div className="card-body">
                                    {/* Mostrar información de la solicitud */}
                                    <p><strong>Motivo:</strong> {solicitud.motivo}</p>
                                    <p><strong>Estudiante:</strong> {solicitud.estudiante}</p>
                                    <p><strong>Fecha de Solicitud:</strong> {new Date(solicitud.fechadesolicitud).toLocaleDateString()}</p>
                                    <p><strong>Fecha para Usar:</strong> {new Date(solicitud.fechaparausar).toLocaleDateString()} - {new Date(solicitud.fechaparausar).toLocaleTimeString()}</p>
                                    <p><strong>Estado:</strong> {solicitud.estadosolicitud}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <h2>Rechazadas</h2>
            <div className="row">
                {solicitudes.filter(solicitud => solicitud.estadosolicitud === 'Rechazada').length === 0 ? (
                    <h4>No hay solicitudes rechazadas.</h4>
                ) : (
                    solicitudes.filter(solicitud => solicitud.estadosolicitud === 'Rechazada').map(solicitud => (
                        <div className="col-md-4 mb-4" key={solicitud._id}>
                            <div className="card">
                                <div className="card-header">
                                <h4>Solicitud de {solicitud.estudiante} </h4>
                                </div>
                                <div className="card-body">
                                    {/* Mostrar información de la solicitud */}
                                    <p><strong>Motivo:</strong> {solicitud.motivo}</p>
                                    <p><strong>Estudiante:</strong> {solicitud.estudiante}</p>
                                    <p><strong>Fecha de Solicitud:</strong> {new Date(solicitud.fechadesolicitud).toLocaleDateString()}</p>
                                    <p><strong>Fecha para Usar:</strong> {new Date(solicitud.fechaparausar).toLocaleDateString()} - {new Date(solicitud.fechaparausar).toLocaleTimeString()}</p>
                                    <p><strong>Estado:</strong> {solicitud.estadosolicitud}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </Box>
        
    );
};

export default SolicitudesRecintos;
