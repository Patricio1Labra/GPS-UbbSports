import React from 'react';
import Modal from 'react-modal';

import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

const VerHorario = ({ isOpen, closeModal, selectedRama }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Ver Horario"
            ariaHideApp={false}
            className="modal-dialog modal-dialog-centered"
        >
            {selectedRama && (
                <div>
                    <h2 className="modal-title">{selectedRama.nombre}</h2>
                    <p><strong>Día:</strong> {selectedRama.horario.dia}</p>
                    <p><strong>Hora de Inicio:</strong> {selectedRama.horario.horaInicio}</p>
                    <p><strong>Hora de Salida:</strong> {selectedRama.horario.horaSalida}</p>
                    <p><strong>Recinto:</strong> {selectedRama.recinto}</p>
                    <p><strong>Entrenador:</strong> {selectedRama.entrenador}</p>
                    <button className="btn btn-secondary" onClick={closeModal}>
                        Cerrar
                    </button>
                </div>
            )}
        </Modal>
    );
};

export default VerHorario;
