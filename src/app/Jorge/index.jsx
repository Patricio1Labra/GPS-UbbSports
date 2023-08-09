import React, { Component } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar los estilos de Bootstrap

class Inicio extends Component {
    render() {
        return (
            <div className="container text-center">
                <div className="row mt-3">
                    <div className="col-md-4">
                        <Link to="/crear-espacio" className="btn btn-dark btn-block">
                            Crear Espacio Deportivo
                        </Link>
                    </div>
                    <div className="col-md-4 mt-2 mt-md-0">
                        <Link to="/pedir-espacio" className="btn btn-dark btn-block">
                            Reservar Espacio Deportivo
                        </Link>
                    </div>
                    <div className="col-md-4 mt-2 mt-md-0">
                        <Link to="/ver-espacio" className="btn btn-dark btn-block">
                            Ver Solicitudes
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Inicio;
