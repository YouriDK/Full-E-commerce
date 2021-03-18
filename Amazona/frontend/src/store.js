import { applyMiddleware, combineReducers, createStore, compose } from "redux";

import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
} from "./reducers/productReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
} from "./reducers/orderReducers";
import {
  userSignInReducer,
  userRegisterReducer,
  userDetailsReducer,
  updateUserProfileReducer,
} from "./reducers/userReducers";
import { cartReducers } from "./reducers/cartReducers";

// * Middleware pour React
import thunk from "redux-thunk";

/*
 * Permet de récupérer les infos stockées dans les cookies
 * const cartItems = Cookie.getJSON("cartItems") || [];
 * const userInfo = Cookie.getJSON("userInfo") || null;
 *
 * ON remplace les cookies par LocalStorage mais ce ne serait pas une solution fiable pour la production
 */
const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
};

// * Get a state and a action and return a new state of that action
const reducer = combineReducers({
  userSignin: userSignInReducer,
  userRegister: userRegisterReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducers,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  userDetails: userDetailsReducer,
  updateUserProfile: updateUserProfileReducer,
});

// TODO comprendre la compose
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
