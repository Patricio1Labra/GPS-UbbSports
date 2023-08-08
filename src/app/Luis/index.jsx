import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap

class Luis extends Component {
    render() {
        return (
            <div className="text-center">
                <div className="mt-3">
                    <Link to="/ver-asistencia" className="btn btn-dark">
                        Ver Asistencia
                    </Link>
                    <Link to="/ver-horario" className="btn btn-dark ml-2">
                        Ver Horario
                    </Link>
                    <Link to="/ver-ramas-inscritas" className="btn btn-dark ml-2">
                        Ver Ramas Inscritas
                    </Link>
                    <Link to="/ver-retroalimentacion" className="btn btn-dark ml-2">
                        Ver Retroalimentación
                    </Link>
                </div>
            </div>
        );
    }
}

export default Luis;
