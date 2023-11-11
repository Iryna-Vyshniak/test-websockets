import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/main.scss';

import reportWebVitals from './reportWebVitals';
import App from './jsx/App';

let ws = new WebSocket('ws://localhost:8080/');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App ws={ws} />
  </React.StrictMode>
);

reportWebVitals();
