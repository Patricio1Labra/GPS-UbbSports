import React from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style.css';

const VerHorario = ({ isOpen, closeModal, selectedRama }) => {
    

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Ver Horario"
            ariaHideApp={false}
            className="modal-dialog modal-dialog-centered"
            overlayClassName="modal-backdrop"
        >
            {selectedRama && (
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{selectedRama.nombre}</h5>
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <p><strong>Día:</strong> {selectedRama.horario.dia}</p>
                        <p><strong>Hora de Inicio:</strong> {selectedRama.horario.horaInicio}</p>
                        <p><strong>Hora de Salida:</strong> {selectedRama.horario.horaSalida}</p>
                        <p><strong>Recinto:</strong> {selectedRama.recinto}</p>
                        <p><strong>Entrenador:</strong> {selectedRama.entrenador}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeModal}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default VerHorario;
