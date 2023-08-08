import React, { useState } from "react";
import sport from '../assets/sports.png';
import axios from 'axios';
import { Route, useNavigate } from 'react-router-dom';
import './Formulario.css'

export function Formulario({ user, setUser }) {
  const [rut, SetRut] = useState("");
  const [password, SetPass] = useState("");
  const [errorRut, setErrorRut] = useState(false); 
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
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

  function validarRut(rut) {
    const cleanRut = rut.replace(/[^0-9kK]/g, '');
    if (cleanRut.length < 2) {
      return false;
    }

    const rutNumbers = cleanRut.slice(0, -1);
    const verificador = cleanRut.slice(-1).toUpperCase();
    const rutWithoutDots = rutNumbers.replace(/\./g, '');
    let sum = 0;
    let factor = 2;

    for (let i = rutWithoutDots.length - 1; i >= 0; i--) {
      sum += parseInt(rutWithoutDots.charAt(i), 10) * factor;
      factor = factor === 7 ? 2 : factor + 1;
    }

    const dvExpected = 11 - (sum % 11);
    const dv = dvExpected === 11 ? '0' : dvExpected === 10 ? 'K' : String(dvExpected);

    return dv === verificador;
  }

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
          <button className="botonini" onClick={handleSubmit}>
            Iniciar Sesión
          </button>
        </center>
      </form>
      {errorRut && (
        <p className="msj">RUT inválido. Por favor, ingrese un RUT válido.</p>
      )}
      {error && (
        <p className="msj">
          Credenciales inválidas. Por favor, verifique sus datos.
        </p>
      )}
    </div>
  );

}

export default Formulario;