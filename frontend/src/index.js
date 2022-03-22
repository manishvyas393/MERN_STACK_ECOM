import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from "react-redux"
import store from "./store"
import { positions, transitions, Provider as AlerProvider } from "react-alert"
import AlertTemplate from "react-alert-template-basic"
const options = {
  timeout: 5000,
  position:positions.BOTTOM_CENTER,
  transition:transitions.SCALE
}

ReactDOM.render(
  <BrowserRouter>
      <Provider store={store}>
    <AlerProvider template={AlertTemplate} {...options}>
      <App />
    </AlerProvider>
  </Provider>
  </BrowserRouter>
,
   
  document.getElementById('root')
);

