import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Asegúrate de haber instalado axios: npm install axios
import "../assets/style.css"
import { useSpring, animated } from 'react-spring'; // Importa useSpring y animated
import { Button, Modal } from 'react-bootstrap';

const DropdownRamaDeportiva = () => {
  const [ramas, setRamas] = useState([]);
  const [recintos, setRecintos] = useState([]);
  const [selectedRama, setSelectedRama] = useState('');
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    nombre: '',
    descripcion: '',
    entrenador: '',
    horario: {
      dia: '',
      horaInicio: '',
      HoraSalida: ''
    },
    cupos: '',
    recinto: '',
    entrenamiento: ''
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  useEffect(() => {
    // llamada a la API para obtener las ramas deportivas
    axios.get('/api/ramasDeportivas')
      .then(response => {
        setRamas(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    // Llamada a la API para obtener los recintos deportivos
    axios.get('/api/recintosDeportivos')
      .then(response => {
        setRecintos(response.data);
      })
      .catch(error => {
        console.error('Error fetching recintos:', error);
      });
  }, []);

  const handleChange = event => {
    setSelectedRama(event.target.value);
  };

  const handleEditClick = () => {
    setEditing(true);
    // Aquí carga los datos de la rama seleccionada en el formulario de edición
    const ramaSeleccionada = ramas.find(rama => rama.nombre === selectedRama);
    setEditedData(ramaSeleccionada);
  };

  const handleFormChange = event => {
    const { name, value } = event.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    // envia los datos editados al servidor
    axios.put(`/api/ramasDeportivas/${selectedRama}`, editedData)
      .then(response => {
        console.log('Data updated successfully:', response.data);
        // Actualiza la lista de ramas deportivas para reflejar los cambios
        setEditing(false);
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };
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
      <div className="content w-100" id="page-wrap">
        <div id="content" className="bg-light w-100">
          <section className="bg-light py-3">
            <div className="container">
              <div className="row">
                <div className="col-lg-9 col-md-8">
                  <h1 className="font-weight-bold-mb-0">Edita tu Rama Deportiva</h1>
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
                    <div className="card rounded-0 ">
                      <div className="card-header bg-light ">
                        <h6 className="form-register w-100">Ingresa tus preferencias para la Rama deportiva!</h6>
                      </div>
                      <div className="card-body pt-2 allign-self-center">
                        <div className="card-header bg-light">
                          <h7 className="form-register">Selecciona la rama</h7>
                          <br />
                          <select className='form-select m-10 w-100 align-self-center' value={selectedRama} onChange={handleChange}>
                            <option value="">Seleccione una rama deportiva</option>
                            {ramas.map(rama => (

                              <option key={rama._id} value={rama.nombre}>{rama.nombre}</option>
                            ))}
                          </select>
                          <button className="btn-primary w-100 align-self-center" type="submit" onClick={handleEditClick} disabled={!selectedRama}>
                            Editar
                          </button>
                        </div>
                        {editing && (
                          <div className='container '>
                            <form className="contact-form" onSubmit={handleFormSubmit}>
                              Nombre:
                              <input className='controls'
                                type="text"
                                name="nombre"
                                value={editedData.nombre}
                                onChange={handleFormChange}
                              />
                              Descripción:
                              <input className='controls'
                                type="text"
                                name="descripcion"
                                value={editedData.descripcion}
                                onChange={handleFormChange}
                              />
                              Entrenador:
                              <input className='controls'
                                name="entrenador"
                                type="text"
                                value={editedData.entrenador}
                                onChange={handleFormChange}
                              />
                              dia:
                              <input className='controls'
                                name="dia"
                                type="text"
                                value={editedData.dia}
                                onChange={handleFormChange}
                              />
                              horaInicio:
                              <input className='controls'
                                name="horaInicio"
                                type="time"
                                value={editedData.horaInicio}
                                onChange={handleFormChange}
                              />
                              cupos:
                              <input className='controls'
                                name="cupos"
                                type="number"
                                value={editedData.cupos}
                                onChange={handleFormChange}
                              />
                              recinto:
                              <select className='form-select m-10 w-100 align-self-center' name="recinto" value={editedData.recinto} onChange={handleFormChange}>
                                <option value="">Seleccione un recinto deportivo</option>
                                {recintos.map(recinto => (
                                  <option key={recinto._id} value={recinto.nombre}>{recinto.nombre}</option>
                                ))}
                              </select>  <animated.div style={buttonAnimation}>
                                <button className="btn-primary w-100 align-self-center" type="submit">Enviar Inscripción</button>
                              </animated.div>
                            </form>
                          </div>

                        )}
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
};

export default DropdownRamaDeportiva;
