import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const CrearEspacioDeportivo = () => {
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('/api/crear', { nombre, tipo });
            console.log('Recinto deportivo creado exitosamente');
        } catch (error) {
            console.error('Error al crear el recinto deportivo', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">Crear Espacio Deportivo</div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tipo" className="form-label">Tipo de Espacio</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tipo"
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-dark">Crear Espacio</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CrearEspacioDeportivo;
