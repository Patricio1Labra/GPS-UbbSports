import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import "../Felipe/Home.css";
import TemporaryDrawer from '../Felipe/Comps/TemporaryDrawer.jsx';
const CrearSolicitudRecinto = ({ user, setUser }) => {
    const [motivo, setMotivo] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [recintos, setRecintos] = useState([]);
    const [recintoSeleccionado, setRecintoSeleccionado] = useState('');
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
        const fetchRecintos = async () => {
            try {
                const response = await axios.get('/api/recintos'); // Cambia la ruta a la correcta
                setRecintos(response.data);
            } catch (error) {
                console.error('Error al obtener la lista de recintos', error);
            }
        };
        fetchRecintos();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!motivo || !fecha || !hora || !recintoSeleccionado) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Por favor complete todos los campos',
            });
            return;
        }

        const fechaHoraCombinada = new Date(`${fecha}T${hora}`);

        try {
            await axios.post('/api/crear-solicitud-recinto', {
                motivo,
                estudiante: user.nombre , // Valor fijo para "estudiante"
                fechadesolicitud: new Date(),
                fechaparausar: fechaHoraCombinada,
                estadosolicitud: 'Pendiente',
                RecintoDeportivo: recintoSeleccionado
            });

            setMotivo('');
            setFecha('');
            setHora('');
            setRecintoSeleccionado('');

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Solicitud de recinto creada exitosamente',
                timer: 2000,
                timerProgressBar: true,
            });

            setTimeout(() => {
                navigate('/home');
            }, 2100);

        } catch (error) {
            console.error('Error al crear la solicitud de recinto', error);
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
            <h1>
                <i
                    className="fa-solid fa-circle-arrow-left"
                    onClick={() => navigate('/home')}
                    style={{ fontSize: '24px', color: 'gray', cursor: 'pointer' }}
                ></i> Crear Solicitud de Recinto
            </h1>
            <div className="card">
                <div className="card-header">Crear Solicitud de Recinto</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="motivo" className="form-label">Motivo</label>
                            <textarea
                                className="form-control"
                                id="motivo"
                                value={motivo}
                                onChange={(e) => setMotivo(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="recinto" className="form-label">Recinto Deportivo</label>
                            <select
                                className="form-select"
                                id="recinto"
                                value={recintoSeleccionado}
                                onChange={(e) => setRecintoSeleccionado(e.target.value)}
                            >
                                <option value="">Seleccione un recinto</option>
                                {recintos.map((recinto) => (
                                    <option key={recinto._id} value={recinto.nombre}>
                                        {recinto.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fecha" className="form-label">Fecha para Usar</label>
                            <input
                                type="date"
                                className="form-control"
                                id="fecha"
                                value={fecha}
                                min={new Date().toISOString().split('T')[0]} // Restringir a la fecha actual o posterior
                                onChange={(e) => setFecha(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="hora" className="form-label">Hora para Usar</label>
                            <input
                                type="time"
                                className="form-control"
                                id="hora"
                                value={hora}
                                min={new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} // Restringir a la hora actual o posterior
                                onChange={(e) => setHora(e.target.value)}
                            />
                        </div>
                        <div className="row justify-content-center">
                            <button type="submit" className="btn btn-success col-md-3">Crear Solicitud</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
        
    );
};

export default CrearSolicitudRecinto;
