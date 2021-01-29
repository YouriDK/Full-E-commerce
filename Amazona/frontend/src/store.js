import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import Cookie from "js-cookie";
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
} from "./reducers/userReducers";
import { cartReducers } from "./reducers/cartReducers";

// * Middleware pour React
import thunk from "redux-thunk";

// *  Permet de récupérer les infos stockées dans les cookies
const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {
  cart: {
    cartItems,
    shipping: {},
    payment: {},
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "Paypal",
  },
  userSignin: { userInfo },
};

/* *  Get a state and a action and return a new state of that action*/
const reducer = combineReducers({
  userSignin: userSignInReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducers,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
});

// TODO comprendre la compose
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,

  composeEnhancer(applyMiddleware(thunk))
);

export default store;
