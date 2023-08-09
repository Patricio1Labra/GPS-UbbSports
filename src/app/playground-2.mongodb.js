// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('GPS');

// Create a new document in the collection.
const students = [
    {
      nombre: 'Alice Johnson',
      carrera: 'Biology',
      correo: 'alice@example.com',
      rut: '987654321',
      telefono: '555-123-4567',
      descripcion: 'Nature enthusiast',
      contraseña: 'securepass123',
      ramaDeportiva: 'Futbol',
      implementosSolicitados: ['Banda de resistencia', 'Zapatillas'],
      recintoSolicitado: 'Pista de atletismo',
    },
    {
      nombre: 'Michael Smith',
      carrera: 'Physics',
      correo: 'michael@example.com',
      rut: '654321987',
      telefono: '555-987-6543',
      descripcion: 'Aspiring physicist',
      contraseña: 'physics123',
      ramaDeportiva: 'Basquetball',
      implementosSolicitados: ['Balón de baloncesto', 'Zapatillas'],
      recintoSolicitado: 'Cancha de baloncesto',
    },

    db.getCollection('estudiantes').insertOne({
        nombre: 'Emily Wilson',
        carrera: 'Psychology',
        correo: 'emily@example.com',
        rut: '789456123',
        telefono: '555-456-7890',
        descripcion: 'Mind explorer',
        contraseña: 'mind123',
        ramaDeportiva: 'Tenis',
        implementosSolicitados: ['Tapete de yoga', 'Ropa cómoda'],
        recintoSolicitado: 'Sala de yoga',
      }),
      
      // Registro de estudiante 4
      db.getCollection('estudiantes').insertOne({
        nombre: 'David Lee',
        carrera: 'Business Administration',
        correo: 'david@example.com',
        rut: '456789123',
        telefono: '555-789-1234',
        descripcion: 'Future entrepreneur',
        contraseña: 'business123',
        ramaDeportiva: 'Futbol',
        implementosSolicitados: ['Traje de baño', 'Gafas de natación'],
        recintoSolicitado: 'Piscina olímpica',
      }),
      
      // Registro de estudiante 5
      db.getCollection('estudiantes').insertOne({
        nombre: 'Sophia Miller',
        carrera: 'Art History',
        correo: 'sophia@example.com',
        rut: '123789456',
        telefono: '555-234-5678',
        descripcion: 'Art lover',
        contraseña: 'art123',
        ramaDeportiva: 'Futbol',
        implementosSolicitados: ['Uniforme de artes marciales', 'Protector bucal'],
        recintoSolicitado: 'Dojo de artes marciales',
      }),

  ];
  
  // Insertar los registros en la colección 'estudiantes'
  db.getCollection('estudiantes').insertMany(students);