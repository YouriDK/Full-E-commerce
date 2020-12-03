import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import Cookie from "js-cookie";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducers } from "./reducers/cartReducers";
import thunk from "redux-thunk"; /* * Middleware pour React*/

const cartItems = Cookie.getJSON("cartItems") || [];
const initialState = { cart: { cartItems } };

/* *  Get a state and a action and return a new state of that action*/
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducers,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
