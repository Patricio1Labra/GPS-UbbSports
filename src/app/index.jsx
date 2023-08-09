import React from 'react';
import ReactDOM from 'react-dom'; // Asegúrate de importar ReactDOM

import App from './App.jsx';
const rootElement = document.getElementById('app');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);