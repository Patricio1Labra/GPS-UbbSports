import { BrowserRouter as Router } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import "../assets/style.css"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import "./Home.css";
import TemporaryDrawer from './Comps/TempEncargado.jsx';


const FormularioInscripcion = () => {
  const [datos, setDatos] = useState({
    alumnos: [],
    nombre: '',
    descripcion: '',
    entrenador: '',
    horarioDia: '',
    horarioInicio: '',
    horarioSalida: '',
    cupos: null,
    recinto: '',
    entrenamiento: '',
  });
  const [recintos, setRecintos] = useState([]);


  useEffect(() => {
    // Llamada a la API para obtener los recintos deportivos
    axios.get('/api/recintosDeportivos')
      .then(response => {
        setRecintos(response.data);
      })
      .catch(error => {
        console.error('Error fetching recintos:', error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatos((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const horarioInicio = new Date(`${datos.horarioDia} ${datos.horarioInicio}`);
    const horarioSalida = new Date(`${datos.horarioDia} ${datos.horarioSalida}`);
    try {
      const response = await axios.post('/api/inscripciones', datos);
      // Mostrar mensaje de éxito con SweetAlert
      Swal.fire({
        icon: 'success',
        title: '¡Inscripción realizada!',
        text: 'La inscripción se ha realizado exitosamente.',
      }).then((result) => {
        // Restablecer los valores de estado del formulario
        if (result.isConfirmed) {
          setDatos({
            alumnos: [],
            nombre: '',
            descripcion: '',
            entrenador: '',
            horarioDia: '',
            horarioInicio: '',
            horarioSalida: '',
            cupos: '',
            recinto: '',
            entrenamiento: '',
          });
        }
      });
    } catch (error) {
      console.error('Error al enviar la inscripción:', error);
      // Mostrar mensaje de error con SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error al enviar la inscripción',
        text: 'Hubo un problema al enviar la inscripción. Por favor, inténtalo nuevamente.',
      });
    }
  };

  // animaciones para los campos de entrada y el botón
  const inputAnimation = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(-20px)' }
  });
  const buttonAnimation = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' }
  });

  return (
    <div className="flex">
      <div className="content" id="page-wrap">
        <div id="content" className="bg-light w-100">
          <section className="bg-light py-3">
            <div className="container">
              <div className="row">
                <div className="col-lg-9 col-md-8">
                  <h1 className="font-weight-bold-mb-0">Crea tu Nueva Rama Deportiva</h1>
                  <p className="lead text-muted">Dentro de este formulario encontraras los detalles para la rama deportiva</p>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container bg-light py-3 border border-2 center-v">
              <div className="row center-h">
                <div className="col-lg-7 my-9">
                  <animated.div style={inputAnimation}>
                    <div className="card rounded-0">
                      <div className="card-header bg-light">
                        <h6 className="form-register">Ingresa tus preferencias para la Rama deportiva!</h6>
                      </div>
                      <div className="card-body pt-2 allign-self-center">
                        <form id="contact-form" className="text-primary" onSubmit={handleSubmit}>
                          <input
                            class="controls"
                            type="text"
                            name="nombre"
                            id="nombre"
                            placeholder="Ingrese su Nombre pra la Rama Deportiva"
                            minlength="4" maxlenght="22" pattern="[a-zA-Z]+*"
                            value={datos.nombre}
                            onChange={handleChange}
                            required
                          />
                          <input
                            class="controls"
                            type="text"
                            name="horarioDia"
                            id="horarioDia"
                            placeholder="Ingrese su el dia en que se realizara la rama"
                            minlength="4" maxlenght="22" pattern="[a-zA-Z]+*"
                            value={datos.horarioDia}
                            onChange={handleChange}
                            required
                          />

                          <input
                            class="controls"
                            type="time"
                            name="horarioInicio"
                            id="horarioInicio"
                            placeholder="Ingrese el horario que quiere solicitar"
                            value={datos.horarioInicio}
                            onChange={handleChange}
                            required
                          />
                          <input
                            class="controls"
                            type="time"
                            name="horarioSalida"
                            id="horarioSalida"
                            placeholder="Ingrese el horario que quiere solicitar"
                            value={datos.horarioSalida}
                            onChange={handleChange}
                            required
                          />
                          <input
                            class="controls"
                            type="text"
                            name="entrenador"
                            id="entrenador"
                            placeholder="Ingrese el entrenador a cargo"
                            minlength="4" maxlength="22" pattern="[a-zA-Z]+*"
                            value={datos.entrenador}
                            onChange={handleChange}
                            required
                          />

                          <input
                            class="controls"
                            type="number"
                            name="cupos"
                            id="cupos"
                            placeholder="Ingrese los cupos necesarios para su rama(Numeros!)"
                            minlength="1" maxlength="9" pattern="[0-9]"
                            value={datos.cupos}
                            onChange={handleChange}
                            required
                          />

                          <select className='form-select m-10 w-100 align-self-center controls' name="recinto" value={datos.recinto} onChange={handleChange}>
                            <option value="">Seleccione un recinto deportivo</option>
                            {recintos.map(recinto => (
                              <option key={recinto._id} value={recinto.nombre}>{recinto.nombre}</option>
                            ))}
                          </select>
                          <animated.div style={buttonAnimation}>
                            <button className="btn-primary w-100 align-self-center" type="submit">Enviar Inscripción</button>
                          </animated.div>
                        </form>
                      </div>
                    </div>
                  </animated.div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default FormularioInscripcion;