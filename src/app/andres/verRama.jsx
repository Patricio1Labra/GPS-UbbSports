import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './edit.css';

function VerRama() {
  const [ramas, setRamas] = useState([]);

  useEffect(() => {
    async function fetchRamas() {
      try {
        const response = await axios.get('/api/obtenerRamas'); // Cambia la ruta según tu API
        setRamas(response.data);
      } catch (error) {
        console.error('Error al cargar las ramas:', error);
      }
    }

    fetchRamas();
  }, []);

  return (
    <div className="app">
      <main>
        <div className="courses-container">
          {ramas.map((rama) => (
            <div key={rama._id} className="course">
              <h2>{rama.nombre}</h2>
              <p>{rama.descripcion}</p>
              <div className="course-buttons">
                <Link to={`/asistencia/${rama._id}`}>
                  <button>Asistencia</button>
                </Link>
                <Link to={`/crear-entrenamiento/${rama._id}`}>
                  <button>Crear Entrenamiento</button>
                </Link>
                <Link to={`/editar-entrenamiento/${rama._id}`}>
                  <button>Editar Entrenamiento</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default VerRama;