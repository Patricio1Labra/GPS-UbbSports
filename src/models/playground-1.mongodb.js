// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('GPS');

// Create a new document in the collection.
db.getCollection('ramadeportivas').insertMany([
    {
      alumnos: ['Alumno1', 'Alumno2'],
      nombre: 'Futbol',
      descripcion: 'Este equipo de futbol...',
      entrenador: 'Entrenador1',
      horario: {
        dia: 'Lunes',
        horaInicio: ISODate('2023-08-01T14:00:00Z'),
        horaSalida: ISODate('2023-08-01T16:00:00Z'),
      },
      cupos: 20,
      recinto: 'Recinto Deportivo 1',
      entrenamiento: 'Entrenamiento 1',
    },
    {
      alumnos: ['Alumno3', 'Alumno4'],
      nombre: 'Basquetball',
      descripcion: 'Este equipo de basquetball',
      entrenador: 'Entrenador2',
      horario: {
        dia: 'Miércoles',
        horaInicio: ISODate('2023-08-03T15:00:00Z'),
        horaSalida: ISODate('2023-08-03T17:00:00Z'),
      },
      cupos: 15,
      recinto: 'Otro Recinto Deportivo',
      entrenamiento: 'Otro Entrenamiento',
    },
    {
      alumnos: ['Alumno5', 'Alumno6', 'Alumno7'],
      nombre: 'Tenis',
      descripcion: 'Este equipo de tenis...',
      entrenador: 'Entrenador3',
      horario: {
        dia: 'Viernes',
        horaInicio: ISODate('2023-08-05T18:00:00Z'),
        horaSalida: ISODate('2023-08-05T20:00:00Z'),
      },
      cupos: 25,
      recinto: 'Recinto Deportivo Extra',
      entrenamiento: 'Entrenamiento Extra',
    }
  ]);
