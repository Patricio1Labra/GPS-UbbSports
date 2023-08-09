import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import VerHorario from './verHorario.jsx'; // Asegúrate de la ruta correcta

const VerRamaInscritas = () => {
    const [ramasInscritas, setRamasInscritas] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedRama, setSelectedRama] = useState(null);
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
        <div>
            <h2>Ramas Inscritas</h2>
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
