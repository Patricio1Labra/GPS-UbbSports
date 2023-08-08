import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CrearEspacioDeportivo = () => {
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');
    const [redirecting, setRedirecting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!nombre || !tipo) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa todos los campos',
            });
            return;
        }

        try {
            await axios.post('/api/crear', { nombre, tipo });
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Recinto deportivo creado exitosamente',
                timer: 2000,
                timerProgressBar: true,
            });
            setNombre('');
            setTipo('');
            setRedirecting(true);
        } catch (error) {
            console.error('Error al crear el recinto deportivo', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al crear el recinto deportivo',
            });
        }
    };

    useEffect(() => {
        if (redirecting) {
            const timeoutId = setTimeout(() => {
                navigate('/');
            }, 2100);

            return () => clearTimeout(timeoutId);
        }
    }, [redirecting, navigate]);

    return (
        <div className="container mt-5">
            <h1><i
            className="fa-solid fa-circle-arrow-left"
            onClick={() => navigate('/')}
            style={{ fontSize: '24px', color: 'gray', cursor: 'pointer' }}
        ></i> Crear Espacio Deportivo</h1>
            <div className="card">
                <div className="card-header ">Crear Espacio Deportivo</div>
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
                        <div className="row justify-content-center">
                            <button type="submit" className="btn btn-success col-md-3">Crear Espacio</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CrearEspacioDeportivo;
