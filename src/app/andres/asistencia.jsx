import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function RegistrarAsistencia() {
  const { id } = useParams();
  const [reservas, setReservas] = useState([
    { id: 1, dia: '2023-08-10', hora: '10:00', recinto: 'Recinto 1' },
    { id: 2, dia: '2023-08-12', hora: '15:30', recinto: 'Recinto 2' },
    // Agrega más reservas según tus datos
  ]);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [alumnos, setAlumnos] = useState([
    'Alumno 1', 'Alumno 2', 'Alumno 3', 'Alumno 4'
    // Agrega más alumnos según tus datos
  ]);
  const [asistenciaAlumnos, setAsistenciaAlumnos] = useState({});

  const handleReservaChange = (e) => {
    const reservaId = parseInt(e.target.value);
    const selected = reservas.find((reserva) => reserva.id === reservaId);
    setSelectedReserva(selected);
    setAsistenciaAlumnos({}); // Reiniciar el estado de asistencia al cambiar la reserva
  };

  const handleAsistenciaChange = (alumno, isChecked) => {
    setAsistenciaAlumnos((prevAsistencia) => ({
      ...prevAsistencia,
      [alumno]: isChecked,
    }));
  };

  const handleSubmit = () => {
    console.log('Reserva seleccionada:', selectedReserva);
    console.log('Datos de asistencia:', asistenciaAlumnos);
    // Lógica para guardar la asistencia
  };

  return (
    <div className="asistencia-container">
      <h2>Registro de Asistencia - Curso {id}</h2>
      <div>
        <label>
          Reserva:
          <select onChange={handleReservaChange} value={selectedReserva ? selectedReserva.id : ''}>
            <option value="">Seleccione una reserva</option>
            {reservas.map((reserva) => (
              <option key={reserva.id} value={reserva.id}>
                {`Dia: ${reserva.dia}, Hora: ${reserva.hora}, Recinto: ${reserva.recinto}`}
              </option>
            ))}
          </select>
        </label>
      </div>
      {selectedReserva && (
        <div>
          <h3>Detalles de la Reserva</h3>
          <p>{`Dia: ${selectedReserva.dia}, Hora: ${selectedReserva.hora}, Recinto: ${selectedReserva.recinto}`}</p>
          <h3>Lista de Alumnos</h3>
          {alumnos.map((alumno) => (
            <div key={alumno} className="alumno-item">
              <label>
                <input
                  type="checkbox"
                  checked={asistenciaAlumnos[alumno] || false}
                  onChange={(e) => handleAsistenciaChange(alumno, e.target.checked)}
                />
                {alumno}
              </label>
            </div>
          ))}
          <button onClick={handleSubmit}>Guardar Asistencia</button>
        </div>
      )}
    </div>
  );
}

export default RegistrarAsistencia;