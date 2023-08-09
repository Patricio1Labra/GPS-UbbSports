import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Luis from './Luis/index.jsx'; // Asegúrate de que la ruta sea correcta


import VerRamaInscritas from './Luis/verRamaInscritas.jsx';


const App = () => {
    return (
        <Router>
            <Routes>
                {/* Cambia las rutas y componentes según tus necesidades */}
                <Route path="/" element={<Luis />} />                
                
                <Route path="/ver-ramas-inscritas" element={<VerRamaInscritas />} />
                
            </Routes>
        </Router>
    );
};

export default App;