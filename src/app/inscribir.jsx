import { BrowserRouter as Router } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const FormularioInscripcion = () => {
  const [datos, setDatos] = useState({
    alumnos: [],
    nombre: '',
    descripcion: '',
    entrenador: '',
    horarioDia: '',
    horarioInicio: '',
    cupos: null,
    recinto: '',
    entrenamiento: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatos((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/inscripciones', datos);
      console.log('Inscripción realizada:', response.data);
    } catch (error) {
      console.error('Error al enviar la inscripción:', error);
    }
  };



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
                    
                      <div className="card rounded-0">
                        <div className="card-header bg-light">
                          <h6 className="form-register">Ingresa tus preferencias para la Rama deportiva!</h6>
                        </div>
                        <div className="card-body pt-2 allign-self-center">
                          <form id="contact-form" className="text-primary" onSubmit={handleSubmit}>
                               <input 
                  class = "controls"
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Ingrese su Nombre pra la Rama Deportiva"
                  minlength="4" maxlenght="22"  pattern="[a-zA-Z]+*"
                  value={datos.nombre}
                  onChange={handleChange}
                  required
                />

                <input
                  class = "controls"
                  type="text"
                  name="espacioDeportivo"
                  id="espacioDeportivo"
                  placeholder="Ingrese su el espacio deportivo que quiere solicitar"
                  minlength="4" maxlenght="22"  pattern="[a-zA-Z]+*"
                  value={datos.espacioDeportivo}
                  onChange={handleChange}
                  required
                />

                <input
                  class = "controls"
                  type="text"
                  name="horarioDia"
                  id="horarioDia"
                  placeholder="Ingrese su el dia en que se realizara la rama"
                  minlength="4" maxlenght="22"  pattern="[a-zA-Z]+*"
                  value={datos.horarioDia}
                  onChange={handleChange}
                  required
                />

                <input
                  class = "controls"
                  type="time"
                  name="horarioInicio"
                  id="horarioInicio"
                  placeholder="Ingrese el horario que quiere solicitar"
                  value={datos.horarioInicio}
                  onChange={handleChange}
                  required
                />

                <input
                  class = "controls"
                  type="text"
                  name="profe"
                  id="profe"
                  placeholder="Ingrese el profesor a cargo"
                  minlength="4" maxlenght="22"  pattern="[a-zA-Z]+*"
                  value={datos.profe}
                  onChange={handleChange}
                  required
                />


                <input
                  class = "controls"
                  type="text"
                  name="cupos"
                  id="cupos"
                  placeholder="Ingrese los cupos necesarios para su rama(Numeros!)"
                  value={datos.cupos}
                  onChange={handleChange}
                  required
                />              
                      <button className="btn-primary w-100 align-self-center" type="submit">Enviar Inscripción</button>
                    </form>
                  </div>
                </div>
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
