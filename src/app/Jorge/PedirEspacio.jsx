import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CrearSolicitudRecinto = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estudiante, setEstudiante] = useState('');
    const [recintos, setRecintos] = useState([]);
    const [recintoSeleccionado, setRecintoSeleccionado] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecintos = async () => {
            try {
                const response = await axios.get('/api/recintos'); // Cambia la ruta a la correcta
                setRecintos(response.data);
            } catch (error) {
                console.error('Error al obtener la lista de recintos', error);
            }
        };
        fetchRecintos();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!nombre || !descripcion || !estudiante || !recintoSeleccionado) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Por favor complete todos los campos',
            });
            return;
        }

        try {
            await axios.post('/api/crear-solicitud-recinto', {
                nombre,
                descripcion,
                estudiante,
                fechadesolicitud: new Date(),
                estadosolicitud: 'Pendiente',
                RecintoDeportivo: recintoSeleccionado
            });

            setNombre('');
            setDescripcion('');
            setEstudiante('');
            setRecintoSeleccionado('');

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Solicitud de recinto creada exitosamente',
                timer: 2000,
                timerProgressBar: true,
            });

            setTimeout(() => {
                navigate('/');
            }, 2100);

        } catch (error) {
            console.error('Error al crear la solicitud de recinto', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">Crear Solicitud de Recinto</div>
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
                            <label htmlFor="descripcion" className="form-label">Descripción</label>
                            <textarea
                                className="form-control"
                                id="descripcion"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="estudiante" className="form-label">Estudiante</label>
                            <input
                                type="text"
                                className="form-control"
                                id="estudiante"
                                value={estudiante}
                                onChange={(e) => setEstudiante(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="recinto" className="form-label">Recinto Deportivo</label>
                            <select
                                className="form-select"
                                id="recinto"
                                value={recintoSeleccionado}
                                onChange={(e) => setRecintoSeleccionado(e.target.value)}
                            >
                                <option value="">Seleccione un recinto</option>
                                {recintos.map((recinto) => (
                                    <option key={recinto._id} value={recinto.nombre}>
                                        {recinto.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-danger" onClick={() => navigate('/')}>Volver</button>
                            <button type="submit" className="btn btn-dark">Crear Solicitud</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CrearSolicitudRecinto;
