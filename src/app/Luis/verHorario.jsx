import React from 'react';
import Modal from 'react-modal';

const VerHorario = ({ isOpen, closeModal, selectedRama }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal}>
            {selectedRama && (
                <div>
                    <h2>{selectedRama.nombre}</h2>
                    <p>Día: {selectedRama.horario.dia}</p>
                    <p>Hora de Inicio: {selectedRama.horario.horaInicio}</p>
                    <p>Hora de Salida: {selectedRama.horario.horaSalida}</p>
                    <p>Recinto: {selectedRama.recinto}</p>
                    <p>Entrenador: {selectedRama.entrenador}</p>
                </div>
            )}
            <button onClick={closeModal}>Cerrar</button>
        </Modal>
    );
};

export default VerHorario;
