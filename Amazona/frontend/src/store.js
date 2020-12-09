import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import Cookie from "js-cookie";
import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
} from "./reducers/productReducers";
import {
  userSignInReducer,
  userRegisterReducer,
} from "./reducers/userReducers";
import { cartReducers } from "./reducers/cartReducers";
import thunk from "redux-thunk"; /* * Middleware pour React*/

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = { userSignin: { userInfo }, cart: { cartItems } };

/* *  Get a state and a action and return a new state of that action*/
const reducer = combineReducers({
  userSignin: userSignInReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducers,
  userRegister: userRegisterReducer,
  productSave: productSaveReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
