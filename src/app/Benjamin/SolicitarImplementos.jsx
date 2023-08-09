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


const CrearSolicitudImplementos = ({ user, setUser }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [showCamposModal, setShowCamposModal] = useState(false);
    const [showEnviadoModal, setShowEnviadoModal] = useState(false);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!nombre || !descripcion || cantidad === 0) {
            setShowCamposModal(true);
            return;
        }

        try {
            const estadosolicitud= "Pendiente";
            const fechadesolicitud = new Date();
            
            await axios.post('/api/solicitudDeImplementos', { nombre, descripcion, cantidad, fechadesolicitud, estadosolicitud });
            setShowEnviadoModal(true);
            setNombre('');
            setDescripcion('');
            setCantidad(0);
        } catch (error) {
            console.error('Error al crear la solicitud de implementos', error);
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
            <div className="card">
                <div className="card-header">Crear solicitud de implmentos</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3"> 
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div className="mb-3"> 
                            <label htmlFor="descipcion" className="form-label">Descripcion de solicitud</label>
                            <input
                                type="text"
                                className="form-control"
                                id="descripcion"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cantidad" className="form-label">Cantidad de implementos que necesita</label>
                            <input
                                type="number"
                                className="form-control"
                                id="cantidad"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-dark"  style={{ backgroundColor: '#007bff' }}>Enviar solicitud de implementos</button>
                    </form>
                </div>
            </div>

            {/* Modal para campos incompletos */}
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: showCamposModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Campos Incompletos</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowCamposModal(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Por favor complete todos los campos antes de enviar el formulario.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowCamposModal(false)}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para formulario enviado */}
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: showEnviadoModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Formulario Enviado</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowEnviadoModal(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Tu solicitud de implementos ha sido enviada exitosamente.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowEnviadoModal(false)}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};;

export default CrearSolicitudImplementos;