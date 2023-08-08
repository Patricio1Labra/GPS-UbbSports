import React from "react";
import { createRoot } from "react-dom/client";
import { render } from "react-dom";


import App from './App.jsx';

const rootElement = document.getElementById('app');
const root = createRoot(rootElement);
root.render(<App />);
render(<App/>, document.getElementById('app'));