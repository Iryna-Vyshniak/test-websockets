import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/main.scss';

import reportWebVitals from './reportWebVitals';
import App from './jsx/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
