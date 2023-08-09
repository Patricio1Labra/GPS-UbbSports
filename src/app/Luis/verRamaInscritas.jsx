import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Modal from 'react-modal';

import VerHorario from './verHorario.jsx';

import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import './assets/style.css'; // Importa el archivo CSS de estilos generales

const VerRamaInscritas = () => {
    const [ramasInscritas, setRamasInscritas] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedRama, setSelectedRama] = useState(null);
    const [estudiante, setEstudiante] = useState(null);
    const estudianteId = '64d3544345d266a0d45a5f5c'; // ID del estudiante (ajusta esto)

    useEffect(() => {
        // Obtiene las ramas deportivas inscritas del estudiante
        axios.get(`/api/estudiantes/${estudianteId}/ramas`)
            .then(response => {
                setRamasInscritas(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las ramas inscritas:', error);
            });

        // Obtiene la información del estudiante
        axios.get(`/api/estudiantes/${estudianteId}`)
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
        <div className="container mt-4">
            <h2 className="title mb-3 fs-4">Ramas Inscritas</h2>
            <div className="card">
                <div className="card-header">
                    <h3 className="fs-5">Antecedentes</h3>
                </div>
                <div className="card-body">
                    {estudiante && (
                        <div>
                            <p className="fs-6"><strong>Nombre:</strong> {estudiante.nombre}</p>
                            <p className="fs-6"><strong>Carrera:</strong> {estudiante.carrera}</p>
                            <p className="fs-6"><strong>Teléfono:</strong> {estudiante.telefono}</p>
                            <p className="fs-6"><strong>Correo:</strong> {estudiante.correo}</p>
                            <p className="fs-6"><strong>RUT:</strong> {estudiante.rut}</p>
                            <p className="fs-6"><strong>Descripción:</strong> {estudiante.descripcion}</p>
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
    );
};

export default VerRamaInscritas;
