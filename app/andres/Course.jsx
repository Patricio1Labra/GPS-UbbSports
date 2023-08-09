import React from 'react';
import { Link } from 'react-router-dom';

function Course({ course }) {
  const { id, title, description } = course;

  return (
    <div className="course">
      <h2>{title}</h2>
      <p>{description}</p>
      {/* No necesitas el bloque de la lista de módulos */}
      <Link to={`/curso/${id}`}>
        <button>Entrar al curso</button>
      </Link>
    </div>
  );
}

export default Course;