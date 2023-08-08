const mongoose = require('mongoose');
const { Schema } = mongoose;

const courses = [
    {
      id: 1,
      title: 'Curso 1',
      description: 'Descripción del curso 1',
      modules: ['Módulo 1', 'Módulo 2', 'Módulo 3'],
    },
    {
      id: 2,
      title: 'Curso 2',
      description: 'Descripción del curso 2',
      modules: ['Módulo 1', 'Módulo 2', 'Módulo 3'],
    },

    {
      id: 3,
      title: 'Curso 3',
      description: 'Descripción del curso 3',
      modules: ['Módulo 1', 'Módulo 2', 'Módulo 3'],
    },
    // Agrega más cursos aquí...
  ];

  export default courses;
