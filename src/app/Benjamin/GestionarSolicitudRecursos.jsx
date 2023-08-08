import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const GestionarSolicitudesRecursos = () => {
    const [solicitudesRecursos, setSolicitudesRecursos] = useState([]);

    useEffect(() => {
        fetchSolicitudesRecursos();
    }, []);

    const fetchSolicitudesRecursos = async () => {
        try {
            const response = await axios.get('/api/solicitudesRecursos');
            setSolicitudesRecursos(response.data);
        } catch (error) {
            console.error('Error fetching solicitudesRecursos', error);
        }
    };

    return (
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestionarSolicitudesRecursos;