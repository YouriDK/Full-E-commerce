import React from 'react';
import ReactDOM from 'react-dom';
import { ReactNotifications } from 'react-notifications-component';
import './css/global.css';
import './css/index.css';
import './css/cart.css';

import './css/product.css';
import './css/card.css';
import './css/checkout.css';
import './css/form.css';
import './css/image.css';
import 'react-notifications-component/dist/theme.css';

import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';

// TODO Comprendre Provider
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ReactNotifications />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
