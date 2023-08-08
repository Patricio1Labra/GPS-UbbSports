import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import VerRama from './andres/verRama.jsx';
import CrearEntrenamiento from './andres/crearEntrenamiento.jsx';
import RegistrarAsistencia from './andres/asistencia.jsx';
import EditarEntrenamiento from './andres/planificacion.jsx';


const App = () =>{
    return (
        <Router>
            <Routes>
                <Route path="/" element={<VerRama />} />
                <Route path="/crear-entrenamiento/:id" element={<CrearEntrenamiento />} />
                <Route path="/asistencia/:id" element={<RegistrarAsistencia />} />
                <Route path="/editar-entrenamiento/:id" element={<EditarEntrenamiento />} />
            </Routes>
        </Router>
    );
}

export default App;