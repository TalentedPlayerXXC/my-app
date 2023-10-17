import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import myContext from './redux/reducer'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <myContext.Provider value="1">
      <App />
    </myContext.Provider>
  </React.StrictMode>
);
