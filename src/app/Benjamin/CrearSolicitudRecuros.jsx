import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const CrearSolicitudRecursos = () => {
    const [nombreSolicitante, setNombreSolicitante] = useState('');
    const [monto, setMonto] = useState(0);
    const [descripcion, setDescripcion] = useState('');
    const [ramaSolicitante, setRamaSolicitante] = useState('');
    const [participantes, setParticipantes] = useState('');
    const [estadoSolicitud, setEstadoSolicitud] = useState('Pendiente');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/solicitudesRecursos', { nombreSolicitante, monto, descripcion, ramaSolicitante, participantes, estadoSolicitud });
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
                                value={descripcion}
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
                        <div className="mb-3">  
                            <label htmlFor="estadosolicitud" className="form-label">Estado de la solicitud</label>
                            <input
                                type="text"
                                className="form-control"
                                id="estadosolicitud"
                                value={estadoSolicitud}  
                                onChange={(e) => setEstadoSolicitud(e.target.value)}
                             />
                        </div>
                        <button type="submit" className="btn btn-dark"  style={{ backgroundColor: '#007bff' }}>Crear solicitud de recursos</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CrearSolicitudRecursos;