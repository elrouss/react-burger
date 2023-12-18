import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from 'services/app/store';

import 'normalize.css';
import 'assets/styles/_index.scss';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
