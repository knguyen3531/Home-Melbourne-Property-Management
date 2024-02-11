// client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Ensure this points to the correct CSS file for global styles
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
