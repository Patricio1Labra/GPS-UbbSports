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
import TemporaryDrawer from '../Felipe/Comps/TempEntrenador.jsx';

const CrearSolicitudRecursos = ({ user, setUser }) => {
    const [nombreSolicitante, setNombreSolicitante] = useState('');
    const [monto, setMonto] = useState(0);
    const [descripciondeSolicitud, setDescripcion] = useState('');
    const [ramaSolicitante, setRamaSolicitante] = useState('');
    const [participantes, setParticipantes] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showIncompleteFieldsModal, setShowIncompleteFieldsModal] = useState(false);
    const [selectedRama, setSelectedRama] = useState('');
    const [selectedEstudiante, setSelectedEstudiante] = useState([]);
    const [ramas, setRamas] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);

    useEffect(() => {
    // llamada a la API para obtener las ramas deportivas
    axios.get('/api/ramasDeportivas')
      .then(response => {
        setRamas(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    // Llamada a la API para obtener los estudiantes
    axios.get('/api/estudiantes')
      .then(response => {
        setEstudiantes(response.data);
      })
      .catch(error => {
        console.error('Error fetching recintos:', error);
      });
    },
    []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!nombreSolicitante || !monto || !descripciondeSolicitud || !ramaSolicitante || !participantes) {
            setShowIncompleteFieldsModal(true);
            return;
        }
        try {
            const estadoSolicitud= "Pendiente";

            await axios.post('/api/recursos', { nombreSolicitante, monto, descripciondeSolicitud, ramaSolicitante, participantes, estadoSolicitud });
            setShowSuccessModal(true);
            setNombreSolicitante('');
            setMonto(0);
            setDescripcion('');
            setRamaSolicitante('');
            setParticipantes('');
        } catch (error) {
            console.error('Error al crear la solicitud de recursos', error);
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

    const handleChange = event => {
        setSelectedRama(event.target.value);
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedEstudiante(selectedOptions);
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
                <div className="card-header">Crear solicitud de recursos</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3"> 
                            <label htmlFor="nombreSolicitante" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombreSolicitante"
                                value={nombreSolicitante}
                                onChange={(e) => setNombreSolicitante(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="monto" className="form-label">Monto solicitado</label>
                            <input
                                type="number"
                                className="form-control"
                                id="monto"
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)}
                            />
                        </div>
                        <div className="mb-3"> 
                            <label htmlFor="descipcion" className="form-label">Descripcion de solicitud</label>
                            <input
                                type="text"
                                className="form-control"
                                id="descripcion"
                                value={descripciondeSolicitud}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                        <label htmlFor="descipcion" className="form-label">Sleccione la rama</label>
                            <br />
                            <select className='form-select m-10 w-100 align-self-center controls' value={selectedRama} onChange={handleChange}>
                              <option value="">Seleccione una rama deportiva</option>
                              {ramas.map(rama => (

                                <option key={rama._id} value={rama.nombre}>{rama.nombre}</option>
                              ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="descipcion" className="form-label">Participantes de la rama</label>
                            <br />
                            <select className='form-select m-10 w-100 align-self-center controls' multiple value={selectedEstudiante} onChange={handleChange}>
                              <option value="">Agregue estudiantes</option>
                              {estudiantes.map(estudiante => (

                                <option key={estudiante._id} value={estudiante.nombre}>{estudiante.nombre}</option>
                              ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-dark"  style={{ backgroundColor: '#007bff' }}>Enviar solicitud de recursos</button>
                    </form>
                </div>
            </div>
        {/* Modal para envío exitoso */}
        <div className={`modal fade ${showSuccessModal ? 'show' : ''}`} style={{ display: showSuccessModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Éxito</h5>
                            <button type="button" className="close" onClick={() => setShowSuccessModal(false)}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Solicitud de recursos creada exitosamente.
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para campos incompletos */}
            <div className={`modal fade ${showIncompleteFieldsModal ? 'show' : ''}`} style={{ display: showIncompleteFieldsModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Campos incompletos</h5>
                            <button type="button" className="close" onClick={() => setShowIncompleteFieldsModal(false)}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Por favor, completa todos los campos antes de enviar la solicitud.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default CrearSolicitudRecursos;