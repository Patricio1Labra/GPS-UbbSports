import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const CrearSolicitudImplementos = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [cantidad, setCantidad] = useState(0);
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const estadosolicitud= "Pendiente";
            const fechadesolicitud = new Date();
            
            await axios.post('/api/solicitudImplementos', { nombre, descripcion, cantidad, fechadesolicitud, estadosolicitud });
            console.log('Solicitud de implementos creada exitosamente');
        } catch (error) {
            console.error('Error al crear la solicitud de implementos', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">Crear solicitud de implmentos</div>
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
                            <label htmlFor="descipcion" className="form-label">Descripcion de solicitud</label>
                            <input
                                type="text"
                                className="form-control"
                                id="descripcion"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cantidad" className="form-label">Cantidad de implementos que necesita</label>
                            <input
                                type="number"
                                className="form-control"
                                id="cantidad"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-dark"  style={{ backgroundColor: '#007bff' }}>Enviar solicitud de implementos</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CrearSolicitudImplementos;