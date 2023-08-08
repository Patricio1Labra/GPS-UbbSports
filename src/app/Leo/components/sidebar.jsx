import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/style.css';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <ul>
                <li>
                    <Link to="../" class="menu-item text-light p-3 border-0"><i class="fas fa-tachometer-alt"></i>
                        Inicio</Link>
                </li>
                <li>

                    <Link to="../" class="menu-item text-light p-3 border-0"><i class="fas fa-users"></i>
                        Grupo equipos</Link>
                </li>
                <li>

                    <Link to="../" class="menu-item text-light p-3 border-0"><i class="fas fa-drumstick-bite"></i>
                        Datos Equipo 1</Link>
                </li>
                <li>

                    <Link to="../" class="menu-item text-light p-3 border-0"><i class="fas fa-drumstick-bite"></i>
                        Datos Equipo 2</Link>
                </li>
                <li>

                    <Link to="../inicio" class="menu-item text-light p-3 border-0"><i class="fas fa-drumstick-bite"></i>
                        Datos Equipo 3 </Link>
                </li>
                <li>

                    <Link to="../" class="menu-item text-light p-3 border-0"><i class="fas fa-drumstick-bite"></i>
                        Datos Equipo 4</Link>
                </li>
                <li>

                    <Link to="../" class="menu-item text-light p-3 border-0"><i class="fas fa-drumstick-bite"></i>
                        Datos Equipo 5</Link>
                </li>
                <li>

                    <Link to="../perfil/" class="menu-item text-light p-3 border-0"><i class="fas fa-user"></i>
                        Perfil</Link>
                </li>
                <li>

                    <Link to="../" class="menu-item text-light p-3 border-0"><i class="fas fa-sliders-h"></i>
                        Configuración</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar 