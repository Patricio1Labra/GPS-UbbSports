import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Modal from 'react-modal';

import './assets/style.css'; // Importa el archivo CSS de estilos generales
import VerHorario from './verHorario.jsx'; // Ajusta la ruta según la ubicación correcta

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
                <button onClick={() => openModal(row)}>Ver Horario</button>
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
        <div className="container">
            <h2 className="title">Ramas Inscritas</h2>
            <div className="antecedentes">
                <h3>Antecedentes</h3>
                {estudiante && (
                    <div className="antecedentes-content">
                        {/* Datos del estudiante */}
                        <div>
                            <p><strong>Nombre:</strong> {estudiante.nombre}</p>
                            <p><strong>Carrera:</strong> {estudiante.carrera}</p>
                            <p><strong>Teléfono:</strong> {estudiante.telefono}</p>
                            <p><strong>Correo:</strong> {estudiante.correo}</p>
                            <p><strong>RUT:</strong> {estudiante.rut}</p>
                            <p><strong>Descripción:</strong> {estudiante.descripcion}</p>
                        </div>
                    </div>
                )}
            </div>
            <DataTable
                columns={columns}
                data={ramasInscritas}
                pagination
                highlightOnHover
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
