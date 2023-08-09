import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Luis from './Luis/index.jsx'; // Asegúrate de que la ruta sea correcta
import VerAsistencia from './Luis/verAsistencia.jsx';

import VerRamaInscritas from './Luis/verRamaInscritas.jsx';
import VerRetroalimentacion from './Luis/verRetroalimentacion.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Cambia las rutas y componentes según tus necesidades */}
                <Route path="/" element={<Luis />} />
                <Route path="/ver-asistencia" element={<VerAsistencia />} />
                
                <Route path="/ver-ramas-inscritas" element={<VerRamaInscritas />} />
                <Route path="/ver-retroalimentacion" element={<VerRetroalimentacion />} />
            </Routes>
        </Router>
    );
};

export default App;