import React from 'react';
import ReactDOM from 'react-dom/client';

import './scss/main.scss';

import reportWebVitals from './reportWebVitals';
import App from './jsx/App';
import WebsocketProvider from './jsx/WebsocketContext';

const ws = new WebSocket('wss://tests-ws.glitch.me/');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WebsocketProvider ws={ws}>
      <App />
    </WebsocketProvider>
  </React.StrictMode>
);

reportWebVitals();
