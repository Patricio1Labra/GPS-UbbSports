import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Modal from 'react-modal';




import { useSpring, animated } from 'react-spring';


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

import VerHorario from './verHorario.jsx';

import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import './assets/style.css'; // Importa el archivo CSS de estilos generales
import { useRadioGroup } from '@mui/material';

const VerRamaInscritas = ({user,setUser}) => {
    const [ramasInscritas, setRamasInscritas] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedRama, setSelectedRama] = useState(null);
    const [estudiante, setEstudiante] = useState(null);
    const estudianteId = '64d3544345d266a0d45a5f5c'; // ID del estudiante (ajusta esto)

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
        // Obtiene las ramas deportivas inscritas del estudiante
        axios.get(`/api/estudiantes1/${estudianteId}/ramas`)
            .then(response => {
                setRamasInscritas(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las ramas inscritas:', error);
            });

        // Obtiene la información del estudiante
        axios.get(`/api/estudiantes1/${estudianteId}`)
            .then(response => {
                setEstudiante(response.data);
            })
            .catch(error => {
                console.error('Error al obtener la información del estudiante:', error);
            });
    }, []);

    const columns = [
        { name: 'Nombre de la Rama', selector: 'nombre', sortable: true },
        {
            name: 'Ver Horario',
            cell: row => (
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => openModal(row)}
                >
                    Ver Horario
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const openModal = (rama) => {
        setSelectedRama(rama);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedRama(null);
        setModalIsOpen(false);
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
              <center><span style={{ color: 'white' }}>Bienvenido,</span> <span style={{ color: 'white' }}>{estudianteId.nombre}</span></center>
            </Typography>
            <Button onClick={handleLogout} style={{ color: 'white' }} color="inherit">Cerrar Sesión</Button>
          </Toolbar>
        </AppBar>
      </Box>
        <div className="container mt-4">
            <h2 className="title mb-3 fs-4">Ramas Inscritas</h2>
            <div className="card">
                <div className="card-header">
                    <h3 className="fs-5">Antecedentes</h3>
                </div>
                <div className="card-body">
                    {estudianteId && (
                        <div>
                            <p className="fs-6"><strong>Nombre:</strong> {estudianteId.nombre}</p>
                            <p className="fs-6"><strong>Carrera:</strong> {estudianteId.carrera}</p>
                            <p className="fs-6"><strong>Teléfono:</strong> {estudianteId.telefono}</p>
                            <p className="fs-6"><strong>Correo:</strong> {estudianteId.correo}</p>
                            <p className="fs-6"><strong>RUT:</strong> {estudianteId.rut}</p>
                            <p className="fs-6"><strong>Descripción:</strong> {estudianteId.descripcion}</p>
                        </div>
                    )}
                </div>
            </div>
            <DataTable
                columns={columns}
                data={ramasInscritas}
                pagination
                highlightOnHover
                className="mt-4 fs-6 table-responsive"
            />
            <VerHorario
                isOpen={modalIsOpen}
                closeModal={closeModal}
                selectedRama={selectedRama}
            />
        </div>
    </div>    
    );
};

export default VerRamaInscritas;
