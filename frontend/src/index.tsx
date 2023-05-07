import React from 'react';

import ReactDOM from 'react-dom/client';
import './css/global.css';
import './css/index.css';
import './css/cart.css';

import './css/product.css';
import './css/card.css';
import './css/checkout.css';
import './css/form.css';
import './css/image.css';

import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// TODO Comprendre Provider
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
