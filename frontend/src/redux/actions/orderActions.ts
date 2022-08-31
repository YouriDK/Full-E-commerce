import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from '../constants/orderConstant';

export const createOrder =
  (order: any) => async (dispatch: any, getState: any) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
      const {
        userSignin: { userInfo },
      } = getState();

      const { data } = await Axios.post('/orders', order, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      console.log('order_saved -> ', data);
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
      dispatch({ type: CART_EMPTY });
      localStorage.removeItem('cartItems');
    } catch (error: any) {
      console.log('error', error);

      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: error,
      });
    }
  };

export const detailsOrder =
  (orderId: any) => async (dispatch: any, getState: any) => {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get(`/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      console.log('getDa&te', data);
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response.data });
    }
  };

export const payOrder =
  (order: any, paymentResult: any) => async (dispatch: any, getState: any) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
    console.log("Let's Pay");
    console.log("Let's Pay with ->", paymentResult);
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        `/orders/pay/${order._id}`,
        paymentResult,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({ type: ORDER_PAY_FAIL, payload: error.response.data });
    }
  };
export const listOrderMine = () => async (dispatch: any, getState: any) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/orders/mine/${userInfo.id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({
      type: ORDER_MINE_LIST_FAIL,
      payload: error.response.data,
    });
  }
};

export const listOrders = () => async (dispatch: any, getState: any) => {
  dispatch({ type: ORDER_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/orders', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.response.data });
  }
};

export const deleteOrder =
  (orderId: any) => async (dispatch: any, getState: any) => {
    dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.delete(`/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({ type: ORDER_DELETE_FAIL, payload: error.response.data });
    }
  };

export const deliverOrder =
  (orderId: any) => async (dispatch: any, getState: any) => {
    dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(
        `/orders/deliver/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({ type: ORDER_DELIVER_FAIL, payload: error.response.data });
    }
  };
