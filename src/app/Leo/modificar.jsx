import { Button, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import "./style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import "../Felipe/Home.css";
import TemporaryDrawer from '../Felipe/Comps/TempEncargado.jsx';





const DropdownRamaDeportiva = ({ user, setUser }) => {
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
  const handleLogout = () => {
    setUser([]); // Reset user state
    localStorage.removeItem('user'); // Clear user data from localStorage
    window.location.href = '/'; // Redirect to login page
  };
  const [menuOpen, setMenuOpen] = useState("");
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };



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
        Swal.fire({
          icon: 'success',
          title: '¡Inscripción enviada!',
          text: 'La inscripción se ha enviado exitosamente.',
        });
      })
      .catch(error => {
        console.error('Error updating data:', error);
        // Mostrar mensaje de error con SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar la inscripción',
          text: 'Hubo un problema al enviar la inscripción. Por favor, inténtalo nuevamente.',
        });
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
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="barra" style={{ color: 'white' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <TemporaryDrawer open={menuOpen} onClose={handleMenuClick} style={{ color: 'black' }} />
            </IconButton>
            <Typography className='texto1' variant="h6" style={{ color: 'white' }} component="div" sx={{ flexGrow: 1 }}>
              <center><span style={{ color: 'white' }}>Bienvenido,</span> <span style={{ color: 'white' }}>{user.nombre}</span></center>
            </Typography>
            <Button onClick={handleLogout} style={{ color: 'white' }} color="inherit">Cerrar Sesión</Button>
          </Toolbar>
        </AppBar>
      </Box>
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
                            <select className='form-select m-10 w-100 align-self-center controls' value={selectedRama} onChange={handleChange}>
                              <option value="">Seleccione una rama deportiva</option>
                              {ramas.map(rama => (

                                <option key={rama._id} value={rama.nombre}>{rama.nombre}</option>
                              ))}
                            </select>
                            <button className="btn-primary w-100 align-self-center " type="submit" onClick={handleEditClick} disabled={!selectedRama}>
                              Editar
                            </button>
                          </div>
                          {editing && (
                            <div className='container '>
                              <form className="contact-form" onSubmit={handleFormSubmit}>
                                <input className='controls'
                                  type="text"
                                  name="nombre"
                                  value={editedData.nombre}
                                  placeholder="Ingrese su Nombre pra la Rama Deportiva"
                                  minlength="4" maxlenght="22" pattern="[a-zA-Z]+*"
                                  onChange={handleFormChange}
                                />
                                <input className='controls'
                                  type="text"
                                  name="descripcion"
                                  value={editedData.descripcion}
                                  placeholder="Ingrese una descrippcion para la rama"
                                  minlength="4" maxlenght="22" pattern="[a-zA-Z]+*"
                                  onChange={handleFormChange}
                                />
                                <input className='controls'
                                  name="entrenador"
                                  type="text"
                                  value={editedData.entrenador}
                                  placeholder="Ingrese el entrenador a cargo"
                                  minlength="4" maxlenght="22" pattern="[a-zA-Z]+*"
                                  onChange={handleFormChange}
                                />
                                <input className='controls'
                                  name="dia"
                                  type="text"
                                  value={editedData.dia}
                                  placeholder="Ingrese su el dia en que se realizara la rama"
                                  minlength="4" maxlenght="22" pattern="[a-zA-Z]+*"
                                  onChange={handleFormChange}
                                />
                                <input className='controls'
                                  name="horaInicio"
                                  type="time"
                                  value={editedData.horaInicio}
                                  placeholder="Ingrese el horario que quiere solicitar"
                                  onChange={handleFormChange}
                                />
                                <input className='controls'
                                  name="HoraSalida"
                                  type="time"
                                  value={editedData.HoraSalida}
                                  placeholder="Ingrese el horario que quiere solicitar"
                                  onChange={handleFormChange}
                                />
                                <input className='controls'
                                  name="cupos"
                                  type="number"
                                  value={editedData.cupos}
                                  placeholder="Ingrese los cupos necesarios para su rama(Numeros!)"
                                  minlength="1" maxlength="9" pattern="[0-9]"
                                  onChange={handleFormChange}
                                />
                                <select className='form-select m-10 w-100 align-self-center controls' name="recinto" value={editedData.recinto} onChange={handleFormChange}>
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
    </div>

  );
};

export default DropdownRamaDeportiva;
