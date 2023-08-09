import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './edit.css';
import axios from 'axios';

function VerRama() {
  const [ramas, setRamas] = useState([]); // Estado para almacenar las ramas deportivas

  useEffect(() => {
    async function fetchRamas() {
      try {
        const response = await axios.get('/api/obtenerRamas'); // Hacer una solicitud para obtener las ramas deportivas desde tu API
        setRamas(response.data); // Establecer las ramas deportivas en el estado
      } catch (error) {
        console.error('Error al cargar las ramas deportivas:', error);
      }
    }

    fetchRamas();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>UBB Sports</h1>
      </header>
      <main>
        <div className="courses-container">
          {ramas.map((rama) => (
            <div key={rama._id} className="course">
              <h2>{rama.nombre}</h2>
              <p>{rama.descripcion}</p>
              <div className="course-buttons">
                <Link to={`/crear-entrenamiento/${rama.nombre}`}>
                  <button>Crear Entrenamiento</button>
                </Link>
                <Link to={`/editar-entrenamiento/${rama.nombre}`}>
                  <button>Editar Entrenamiento</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer>
        <p>© 2023 UBB Sports</p>
      </footer>
    </div>
  );
}

export default VerRama;