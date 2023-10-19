import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import myContext from './redux/reducer'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <myContext.Provider value={{ a, b }}> */}
      <App />
    {/* </myContext.Provider> */}
  </React.StrictMode >
);
