import React, { Component } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class Inicio extends Component {
    render() {
        return (
            <><div className="text-center">
            </div>
            <div className="text-center">
                    <div className="mt-3">
                        <Link to="/solicitar-implementos" className="btn btn-dark" style={{ backgroundColor: '#007bff' }}>
                            Ir a Solicitar implementos
                        </Link>
                    </div>
                    <div className="mt-3">
                        <Link to="/solicitar-recursos" className="btn btn-dark" style={{ backgroundColor: '#007bff' }}>
                        Ir a Solicitar recursos
                        </Link>
                    </div>
                    <div className="mt-3">
                        <Link to="/gestionar-recursos" className="btn btn-dark" style={{ backgroundColor: '#007bff' }}>
                        Ir a Gestionar solicitudes de recursos
                        </Link>
                    </div>
                </div></>
        );
    }
}

export default Inicio;