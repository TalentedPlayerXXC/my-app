import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
// import myContext from './redux/reducer'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <myContext.Provider value={{ a, b }}> */}
      <App />
      {/* </myContext.Provider> */}
    </BrowserRouter>
  </React.StrictMode >
);
