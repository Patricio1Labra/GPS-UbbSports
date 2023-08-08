import React, { Component } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar los estilos de Bootstrap

class Inicio extends Component {
    render() {
        return (
            <div className="text-center">
                <div className="mt-3">
                    <Link to="/crear-espacio" className="btn btn-dark">
                        Crear Espacio Deportivo
                    </Link>
                    <Link to="/pedir-espacio" className="btn btn-dark ml-2">
                        Reservar Espacio Deportivo
                    </Link>
                </div>
            </div>
        );
    }
}

export default Inicio;