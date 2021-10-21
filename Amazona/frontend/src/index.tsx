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
import store from './store';

// TODO Comprendre Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
