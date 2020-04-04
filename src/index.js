import React from 'react';
import ReactGA from 'react-ga';
import ReactDOM from 'react-dom';
import App from './components/app';

ReactGA.initialize('UA-146904576-1');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
