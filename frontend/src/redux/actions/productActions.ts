import axios from 'axios';
import { ProductProps } from '../../data';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_SWITCH_CATEGORIES,
} from '../constants/productConstants';

const listProducts = () => async (dispatch: any) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get('/products');
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.response.data });
  }
};

const saveProduct =
  (product: ProductProps) => async (dispatch: Function, getState: Function) => {
    try {
      dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });

      const {
        userSignin: { userInfo },
      } = getState(); // *  Permet de récupérer le Token
      if (!product._id) {
        const { data } = await axios.post('/products', product, {
          headers: { Authorization: 'Bearer ' + userInfo.token },
        });
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      } else {
        const { data } = await axios.put('/products/' + product._id, product, {
          headers: { Authorization: 'Bearer ' + userInfo.token },
        });
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      }
    } catch (error: any) {
      dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.response.data });
    }
  };

const detailsProduct = (productId: string) => async (dispatch: any) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get('/products/' + productId);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data,
    });
  }
};
const switchCategoyProduct = (category: string) => (dispatch: any) => {
  dispatch({ type: PRODUCT_SWITCH_CATEGORIES, payload: category });
};

const deleteProduct =
  (productId: string) => async (dispatch: any, getState: any) => {
    try {
      const {
        userSignin: { userInfo },
      } = getState(); // *  Permet de récupérer le Token
      dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
      const { data } = await axios.delete('/products/' + productId, {
        headers: { Authorization: 'Bearer ' + userInfo.token },
      });
      dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
    } catch (error: any) {
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.response.data });
    }
  };

export {
  listProducts,
  detailsProduct,
  saveProduct,
  deleteProduct,
  switchCategoyProduct,
};
