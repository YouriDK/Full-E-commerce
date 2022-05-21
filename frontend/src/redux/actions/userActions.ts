import Axios from 'axios';
import { errorMaker } from '../../utils';
import {
  GOOGLE_SIGNIN_FAIL,
  GOOGLE_SIGNIN_REQUEST,
  GOOGLE_SIGNIN_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_GET_FAIL,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_SIGNOUT,
} from '../constants/userConstants';

export const googleLogin = (googleData: any) => async (dispatch: any) => {
  dispatch({ type: GOOGLE_SIGNIN_REQUEST, payload: { googleData } });
  try {
    const { data } = await Axios.post('/login', {
      token: googleData.tokenId,
    });
    dispatch({ type: GOOGLE_SIGNIN_SUCCESS, payload: data });
    console.log('DATA ->', data);
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error: any) {
    console.log('error ->', error);
    console.log('error MESSAGE->', error.message);
    dispatch({
      type: GOOGLE_SIGNIN_FAIL,
      payload: error,
    });
  }
};

export const signout = () => (dispatch: any) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shipping_address');
  dispatch({ type: USER_SIGNOUT });
};

export const detailsUser =
  (userId: any) => async (dispatch: any, getState: any) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId });

    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get(`/user/${userId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data });
    }
  };

export const listUsers = () => async (dispatch: any, getState: any) => {
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    dispatch({ type: USER_GET_REQUEST });
    const { data } = await Axios.get('/user/list', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_GET_SUCCESS, payload: data });
  } catch (error: any) {
    if (error.response.status === 404) {
      dispatch({
        type: USER_GET_FAIL,
        payload: errorMaker(404, '/user/list'),
      });
    } else {
      dispatch({ type: USER_GET_FAIL, payload: error.response.data });
    }
  }
};
