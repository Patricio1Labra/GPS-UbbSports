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
            const response = await axios.get('/api/recursos');
            setSolicitudesRecursos(response.data);
        } catch (error) {
            console.error('Error fetching solicitudesRecursos', error);
        }
    };

    const handleRechazar = async (index) => {
        const updatedSolicitudes = [...solicitudesRecursos];
        const solicitud = updatedSolicitudes[index];
    
        solicitud.estadoSolicitud = 'Rechazada';
        setSolicitudesRecursos(updatedSolicitudes);
    
        try {
            await axios.put(`/api/recursos/${solicitud._id}`, solicitud);
        } catch (error) {
            console.error('Error cambiando el estado de la solicitud', error);
        }
    };

    const handleAceptar = async (index) => {
        const updatedSolicitudes = [...solicitudesRecursos];
        const solicitud = updatedSolicitudes[index];
    
        solicitud.estadoSolicitud = 'Aceptada';
        setSolicitudesRecursos(updatedSolicitudes);
    
        try {
            await axios.put(`/api/recursos/${solicitud._id}`, solicitud);
        } catch (error) {
            console.error('Error cambiando el estado de la solicitud', error);
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
                        <th>Acciones</th>
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
                            <td>
                                <button
                                    className="btn btn-success"
                                    onClick={() => handleAceptar(index)}
>
                                    Aceptar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleRechazar(index)}
                                >
                                    Rechazar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestionarSolicitudesRecursos;