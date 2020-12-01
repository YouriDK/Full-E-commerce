import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import thunk from "redux-thunk"; /* * Middleware pour React*/

const initialState = {};

/* *  Get a state and a action and return a new state of that action*/
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
