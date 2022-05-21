import React from 'react';
import ReactDOM from 'react-dom';

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
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';

// TODO Comprendre Provider
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
