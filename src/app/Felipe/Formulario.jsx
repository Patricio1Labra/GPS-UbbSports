import React, { useState } from "react";
import sport from '../assets/sports.png';
import axios from 'axios';
import { Route, useNavigate } from 'react-router-dom';
import './Formulario.css'
import { OverlayTrigger, Popover } from 'react-bootstrap';
export function Formulario({ user, setUser }) {

  const [rut, SetRut] = useState("");
  const [password, SetPass] = useState("");
  const [errorRut, setErrorRut] = useState(false); 
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function validarRut(rut) {
    const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  
    if (cleanRut.length < 2) {
      return false;
    }
  
    const rutNumbers = cleanRut.slice(0, -1);
    const verificadorIngresado = cleanRut.slice(-1);
    const rutWithoutDots = rutNumbers.replace(/\./g, '');
    let sum = 0;
    let factor = 2;
  
    for (let i = rutWithoutDots.length - 1; i >= 0; i--) {
      sum += parseInt(rutWithoutDots.charAt(i), 10) * factor;
      factor = factor === 7 ? 2 : factor + 1;
    }
  
    const dvExpected = 11 - (sum % 11);
    const dv = dvExpected === 11 ? '0' : dvExpected === 10 ? 'K' : String(dvExpected);
  
    return dv === verificadorIngresado;
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!validarRut(rut)){
      setErrorRut(true);
      return;
    }
    try {
      const response = await axios.post('/api/login', {
        rut: rut,
        password: password
      });

     const userLogged = response.data;
     
      if (userLogged) {
        setError(false);
        setUser(userLogged);
        localStorage.setItem('user', JSON.stringify(userLogged));
        if (userLogged.hasOwnProperty('carrera')) {
          navigate("/home");
        } else if (userLogged.hasOwnProperty('ramaDeportiva')) {
          navigate("/home-entrenador");
        } else if (userLogged.hasOwnProperty('ramaCreada')) {
          navigate("/home-encargado");
        }
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const rutPopover = (
    <Popover id="popover-basic">
    <Popover.Header as="h3" className="popover-header">
      RUT inválido
      <span className="popover-close-button" onClick={() => setErrorRut(false)}>
        X
      </span>
    </Popover.Header>
    <Popover.Body>
      Por favor, ingrese un RUT válido.
    </Popover.Body>
  </Popover>
);

  return (
    <div>
      <div className="imageContainer">
        {/* Imagen de fondo u otra imagen */}
        <img src={sport} alt="Logo" />
      </div>
      <form className="formulario">
        {/* Resto de tu formulario */}
        <label className="ubb">Universidad del Bío-Bío</label>
        <p className="text1">Por favor ingresar sus datos</p>
        <div className="inputContainer">
          <label className="input1">
            <span className="text-nomb"></span>
          </label>
          <input
            type="text"
            value={rut}
            onChange={(event) => SetRut(event.target.value)}
            placeholder="ej: 12.345.678-9"
            required
          />
        </div>
        <div className="inputContainer">
          <label className="input1">
            <span className="text-nomb"></span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(event) => SetPass(event.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>
        <center>
          {/* Utilizamos OverlayTrigger para mostrar el popover */}
          <OverlayTrigger
            trigger="click"
            placement="top"
            show={errorRut}
            overlay={rutPopover}
          >
        
          <button className="botonini" onClick={handleSubmit}>
            Iniciar Sesión
          </button>
          </OverlayTrigger>
          </center>
      </form>
      {error && (
        <p className="msj">
          Credenciales inválidas. Por favor, verifique sus datos.
        </p>
      )}
    </div>
  );

}

export default Formulario;