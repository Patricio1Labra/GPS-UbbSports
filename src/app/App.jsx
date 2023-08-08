import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './Jorge/index.jsx';
import Crear from './Jorge/CrearEspacio.jsx';
import Pedir from './Jorge/PedirEspacio.jsx';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/crear-espacio" element={<Crear />} />
                <Route path="/pedir-espacio" element={<Pedir />} />
            </Routes>
        </Router>
    );
};
export default App;