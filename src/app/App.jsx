import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './Benjamin/index.jsx';
import SolicitarImplementos from './Benjamin/SolicitarImplementos.jsx';
import CrearSolicitudRecursos from './Benjamin/CrearSolicitudRecuros.jsx';
import GestionarSolicitudRecursos from './Benjamin/GestionarSolicitudRecursos.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/solicitar-implementos" element={<SolicitarImplementos />} />
                <Route path="/gestionar-recursos" element={<GestionarSolicitudRecursos />} />
                <Route path="/solicitar-recursos" element={<CrearSolicitudRecursos />} />
            </Routes>
        </Router>
    );
};

export default App;