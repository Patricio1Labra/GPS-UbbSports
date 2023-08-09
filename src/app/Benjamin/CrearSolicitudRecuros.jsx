import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const CrearSolicitudRecursos = () => {
    const [nombreSolicitante, setNombreSolicitante] = useState('');
    const [monto, setMonto] = useState(0);
    const [descripciondeSolicitud, setDescripcion] = useState('');
    const [ramaSolicitante, setRamaSolicitante] = useState('');
    const [participantes, setParticipantes] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const estadoSolicitud= "Pendiente";

            await axios.post('/api/recursos', { nombreSolicitante, monto, descripciondeSolicitud, ramaSolicitante, participantes, estadoSolicitud });
            console.log('Solicitud de recursos creada exitosamente');
        } catch (error) {
            console.error('Error al crear la solicitud de recursos', error);
        }
    };

    return (
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
                            <label htmlFor="ramaSolicitante" className="form-label">Rama a la que pertenece el solicitante</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tramaSolicitante"
                                value={ramaSolicitante}
                                onChange={(e) => setRamaSolicitante(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="participantes" className="form-label">Participantes de la rama</label>
                            <input
                                type="text"
                                className="form-control"
                                id="participantes"
                                value={participantes}
                                onChange={(e) => setParticipantes(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-dark"  style={{ backgroundColor: '#007bff' }}>Enviar solicitud de recursos</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CrearSolicitudRecursos;