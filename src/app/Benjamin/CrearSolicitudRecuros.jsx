import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const CrearSolicitudRecursos = () => {
    const [nombreSolicitante, setNombreSolicitante] = useState('');
    const [monto, setMonto] = useState(0);
    const [descripciondeSolicitud, setDescripcion] = useState('');
    const [ramaSolicitante, setRamaSolicitante] = useState('');
    const [participantes, setParticipantes] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showIncompleteFieldsModal, setShowIncompleteFieldsModal] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!nombreSolicitante || !monto || !descripciondeSolicitud || !ramaSolicitante || !participantes) {
            setShowIncompleteFieldsModal(true);
            return;
        }
        try {
            const estadoSolicitud= "Pendiente";

            await axios.post('/api/recursos', { nombreSolicitante, monto, descripciondeSolicitud, ramaSolicitante, participantes, estadoSolicitud });
            setShowSuccessModal(true);
            setNombreSolicitante('');
            setMonto(0);
            setDescripcion('');
            setRamaSolicitante('');
            setParticipantes('');
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
        {/* Modal para envío exitoso */}
        <div className={`modal fade ${showSuccessModal ? 'show' : ''}`} style={{ display: showSuccessModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Éxito</h5>
                            <button type="button" className="close" onClick={() => setShowSuccessModal(false)}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Solicitud de recursos creada exitosamente.
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para campos incompletos */}
            <div className={`modal fade ${showIncompleteFieldsModal ? 'show' : ''}`} style={{ display: showIncompleteFieldsModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Campos incompletos</h5>
                            <button type="button" className="close" onClick={() => setShowIncompleteFieldsModal(false)}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Por favor, completa todos los campos antes de enviar la solicitud.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearSolicitudRecursos;