import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';


const SolicitudesRecintos = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchSolicitudes = async () => {
            try {
                const response = await axios.get('/api/solicitudes-recintos');
                setSolicitudes(response.data);
            } catch (error) {
                console.error('Error al obtener las solicitudes de recintos', error);
            }
        };
        fetchSolicitudes();
    }, []);

    const handleRechazar = async (solicitudId) => {
        try {
            await axios.put(`/api/solicitudes-recintos/${solicitudId}`, { estadosolicitud: 'Rechazada' });
            setSolicitudes(prevSolicitudes =>
                prevSolicitudes.map(solicitud =>
                    solicitud._id === solicitudId ? { ...solicitud, estadosolicitud: 'Rechazada' } : solicitud
                )
            );
            mostrarAlerta('Solicitud rechazada exitosamente', 'success');
        } catch (error) {
            console.error('Error al rechazar la solicitud', error);
            mostrarAlerta('Hubo un error al rechazar la solicitud', 'error');
        }
    };

    const handleAceptar = async (solicitudId) => {
        try {
            await axios.put(`/api/solicitudes-recintos/${solicitudId}`, { estadosolicitud: 'Aceptada' });
            setSolicitudes(prevSolicitudes =>
                prevSolicitudes.map(solicitud =>
                    solicitud._id === solicitudId ? { ...solicitud, estadosolicitud: 'Aceptada' } : solicitud
                )
            );
            mostrarAlerta('Solicitud aceptada exitosamente', 'success');
        } catch (error) {
            console.error('Error al aceptar la solicitud', error);
            mostrarAlerta('Hubo un error al aceptar la solicitud', 'error');
        }
    };

    const mostrarAlerta = (mensaje, tipo) => {
        Swal.fire({
            icon: tipo,
            title: tipo === 'success' ? 'Éxito' : 'Error',
            text: mensaje,
            timer: 2000,
            timerProgressBar: true,
        });
    };

    return (
        <div className="container mt-5">
            <h1><i
            className="fa-solid fa-circle-arrow-left"
            onClick={() => navigate('/')}
            style={{ fontSize: '24px', color: 'gray', cursor: 'pointer' }}
        ></i> Solicitudes de Recintos</h1>
        

            <h2>Pendientes</h2>
            <div className="row">
            {solicitudes.filter(solicitud => solicitud.estadosolicitud === 'Pendiente').length === 0 ? (
                    <h4>No hay solicitudes pendientes.</h4>
                ) : (solicitudes.filter(solicitud => solicitud.estadosolicitud === 'Pendiente').map(solicitud => (
                    <div className="col-md-4 mb-4" key={solicitud._id}>
                        <div className="card">
                            <div className="card-header">
                                <strong>Nombre:</strong> {solicitud.nombre}
                            </div>
                            <div className="card-body">
                                {/* Mostrar información de la solicitud */}
                                <p><strong>Descripción:</strong> {solicitud.descripcion}</p>
                                <p><strong>Estudiante:</strong> {solicitud.estudiante}</p>
                                <p><strong>Fecha de Solicitud:</strong> {new Date(solicitud.fechadesolicitud).toLocaleDateString()}</p>
                                <p><strong>Estado:</strong> {solicitud.estadosolicitud}</p>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <button className="btn btn-danger" onClick={() => handleRechazar(solicitud._id)}>Rechazar</button>
                                <button className="btn btn-success" onClick={() => handleAceptar(solicitud._id)}>Aceptar</button>
                            </div>
                        </div>
                    </div>
                )))}
            </div>

            <h2>Aceptadas</h2>
                <div className="row">
                {solicitudes.filter(solicitud => solicitud.estadosolicitud === 'Aceptada').length === 0 ? (
                    <h4>No hay solicitudes aceptadas.</h4>
                ) : (
                    solicitudes.filter(solicitud => solicitud.estadosolicitud === 'Aceptada').map(solicitud => (
                        <div className="col-md-4 mb-4" key={solicitud._id}>
                            <div className="card">
                                <div className="card-header">
                                    <strong>Nombre:</strong> {solicitud.nombre}
                                </div>
                                <div className="card-body">
                                    {/* Mostrar información de la solicitud */}
                                    <p><strong>Descripción:</strong> {solicitud.descripcion}</p>
                                    <p><strong>Estudiante:</strong> {solicitud.estudiante}</p>
                                    <p><strong>Fecha de Solicitud:</strong> {new Date(solicitud.fechadesolicitud).toLocaleDateString()}</p>
                                    <p><strong>Estado:</strong> {solicitud.estadosolicitud}</p>
                                </div>
                            </div>
                        </div>
                    )))}
                </div>
            <h2>Rechazadas</h2>
                <div className="row">
                {solicitudes.filter(solicitud => solicitud.estadosolicitud === 'Rechazada').length === 0 ? (
                    <h4>No hay solicitudes rechazadas.</h4>
                ) : (
                    solicitudes.filter(solicitud => solicitud.estadosolicitud === 'Rechazada').map(solicitud => (
                        <div className="col-md-4 mb-4" key={solicitud._id}>
                            <div className="card">
                                <div className="card-header">
                                    <strong>Nombre:</strong> {solicitud.nombre}
                                </div>
                                <div className="card-body">
                                    {/* Mostrar información de la solicitud */}
                                    <p><strong>Descripción:</strong> {solicitud.descripcion}</p>
                                    <p><strong>Estudiante:</strong> {solicitud.estudiante}</p>
                                    <p><strong>Fecha de Solicitud:</strong> {new Date(solicitud.fechadesolicitud).toLocaleDateString()}</p>
                                    <p><strong>Estado:</strong> {solicitud.estadosolicitud}</p>
                                </div>
                            </div>
                        </div>
                    )))}
                </div>
        </div>
    );
};

export default SolicitudesRecintos;
