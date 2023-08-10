import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

import VerHorario from './verHorario.jsx';
import { useSpring, animated } from 'react-spring';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TemporaryDrawer from '../Felipe/Comps/TempEncargado.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css';
import { useRadioGroup } from '@mui/material';

const VerRamaInscritas = ({ user, setUser }) => {
  const [ramasInscritas, setRamasInscritas] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRama, setSelectedRama] = useState(null);
  const [estudiante, setEstudiante] = useState(null);
  const estudianteId = user._id; // Usamos el _id del estudiante que ha iniciado sesión

  const handleLogout = () => {
    setUser([]); // Resetear el estado de usuario
    localStorage.removeItem('user'); // Limpiar los datos del usuario del localStorage
    window.location.href = '/'; // Redirigir a la página de inicio de sesión
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Obtiene las ramas deportivas inscritas del estudiante
    axios.get(`/api/estudiantes1/${user._id}/ramas`)
        .then(response => {
            setRamasInscritas(response.data);
        })
        .catch(error => {
            console.error('Error al obtener las ramas inscritas:', error);
        });

    // Obtiene la información del estudiante
    axios.get(`/api/estudiantes1/${user._id}`)
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
              <center><span style={{ color: 'white' }}>Bienvenido,</span> <span style={{ color: 'white' }}>{user.nombre}</span></center>
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
                    <div className="row">
                        <div className="col-md-6">
                        <p className="fs-6"><strong>Nombre:</strong> {user.nombre}</p>
                        <p className="fs-6"><strong>Carrera:</strong> {user.carrera}</p>
                        <p className="fs-6"><strong>Teléfono:</strong> {user.telefono}</p>
                        </div>
                        <div className="col-md-6">
                        <p className="fs-6"><strong>Correo:</strong> {user.correo}</p>
                        <p className="fs-6"><strong>RUT:</strong> {user.rut}</p>
                        <p className="fs-6"><strong>Descripción:</strong> {user.descripcion}</p>
                        </div>
                    </div>
                    )}
                    </div>
            </div>
            <DataTable
        columns={columns}
        data={ramasInscritas}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        paginationComponentOptions={{
          rowsPerPageText: 'Filas por página:',
          rangeSeparatorText: 'de',
          noRowsPerPage: false,
          selectAllRowsItem: false,
          selectAllRowsItemText: 'Todos',
          nextIcon: 'Siguiente',
          prevIcon: 'Anterior',
        }}
        paginationIconFirstPage={<span>&laquo;&laquo;</span>}
        paginationIconLastPage={<span>&raquo;&raquo;</span>}
        paginationIconNext={<span>&raquo;</span>}
        paginationIconPrevious={<span>&laquo;</span>}
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
