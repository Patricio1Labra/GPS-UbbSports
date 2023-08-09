import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Formulario } from './Felipe/Formulario.jsx';
import { Home } from './Felipe/Home.jsx';
import { HomeEncargado } from './Felipe/HomeEncargado.jsx';
import { HomeEntrenador } from './Felipe/HomeEntrenador.jsx';
import { VerSolicitudesImplemento } from './Felipe/Vistas/VerSolicitudesImplemento.jsx';
import Crear from './Jorge/CrearEspacio.jsx';
import Pedir from './Jorge/PedirEspacio.jsx';
import Ver from './Jorge/VerSolicitudes.jsx';
import InscribirRama from './Leo/inscribir.jsx';
import ModificarRama from './Leo/modificar.jsx';
import SolicitarImplementos from './Benjamin/SolicitarImplementos.jsx';
import CrearSolicitudRecursos from './Benjamin/CrearSolicitudRecuros.jsx';
import GestionarSolicitudRecursos from './Benjamin/GestionarSolicitudRecursos.jsx';
import VerRamaInscritas from './Luis/verRamaInscritas.jsx';
import VerRama from './andres/verRama.jsx';
import CrearEntrenamiento from './andres/crearEntrenamiento.jsx';
import EditarEntrenamiento from './andres/planificacion.jsx';
// Importa otros componentes y dependencias necesarias

function App() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(storedUser || []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Formulario user={user} setUser={setUser} />}
        />
        <Route
          path="/home"
          element={<Home user={user} setUser={setUser} />}
        />
        <Route
          path="/home-encargado"
          element={<HomeEncargado user={user} setUser={setUser} />}
        />
        <Route
          path="/home-entrenador"
          element={<HomeEntrenador user={user} setUser={setUser} />}
        />
        <Route
          path="/ver-solicitudes-implemento"
          element={<VerSolicitudesImplemento user={user} setUser={setUser} />}
        />
        <Route path="/crear-espacio" element={<Crear user={user} setUser={setUser} />} />
        <Route path="/pedir-espacio" element={<Pedir user={user} setUser={setUser} />} />
        <Route path="/ver-espacio" element={<Ver user={user} setUser={setUser} />} />


        <Route path="/crear-rama" element={<InscribirRama user={user} setUser={setUser} />} />
        <Route path="/editar-rama" element={<ModificarRama user={user} setUser={setUser} />} />

        <Route path="/solicitar-implementos" element={<SolicitarImplementos user={user} setUser={setUser} />} />
        <Route path="/gestionar-recursos" element={<GestionarSolicitudRecursos user={user} setUser={setUser} />} />
        <Route path="/solicitar-recursos" element={<CrearSolicitudRecursos user={user} setUser={setUser} />} />

        <Route path="/ver-ramas-inscritas" element={<VerRamaInscritas user={user} setUser={setUser} />} />

        <Route path="/crear-entrenamiento/:id" element={<CrearEntrenamiento user={user} setUser={setUser} />} />
        <Route path="/editar-entrenamiento/:id" element={<EditarEntrenamiento user={user} setUser={setUser} />} />
        <Route path="/ver-rama" element={<VerRama user={user} setUser={setUser} />} />





      </Routes>
    </BrowserRouter>
  );
}
export default App;