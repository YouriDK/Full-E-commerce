import Axios from 'axios';
//import Cookie from "js-cookie";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_GET_REQUEST,
  USER_GET_SUCCESS,
  USER_GET_FAIL,
  GOOGLE_SIGNIN_REQUEST,
  GOOGLE_SIGNIN_SUCCESS,
  GOOGLE_SIGNIN_FAIL,
} from '../constants/userConstants';

export const signin = (email: any, password: any) => async (dispatch: any) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post('/api/users/signin', {
      email,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));

    // Cookie.set("userInfo", JSON.stringify(data));
  } catch (error: any) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: error.response.data,
    });
  }
};

export const googleLogin = (googleData: any) => async (dispatch: any) => {
  dispatch({ type: GOOGLE_SIGNIN_REQUEST, payload: { googleData } });
  try {
    const { data } = await Axios.post('/api/users/signin/google', {
      token: googleData.tokenId,
    });

    dispatch({ type: GOOGLE_SIGNIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error: any) {
    dispatch({
      type: GOOGLE_SIGNIN_FAIL,
      payload: error.response.data,
    });
  }
};

export const signout = () => (dispatch: any) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  dispatch({ type: USER_SIGNOUT });
};

export const register =
  (name: any, email: any, password: any) => async (dispatch: any) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { name, email, password },
    });
    try {
      const { data } = await Axios.post('/api/users/register', {
        name,
        email,
        password,
      });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      //Cookie.set("userInfo", JSON.stringify(data));
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response.data,
      });
    }
  };

export const detailsUser =
  (userId: any) => async (dispatch: any, getState: any) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId });

    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data });
    }
  };

export const updateUserProfile =
  (user: any) => async (dispatch: any, getState: any) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: user });
    const {
      userSignin: { userInfo },
    } = getState();

    try {
      const { data } = await Axios.put(`/api/users/profile`, user, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

      // *  Si on a changé il faut reconnecter avec les nouveaux paramètres
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error: any) {
      dispatch({ type: USER_UPDATE_FAIL, payload: error.response.data });
    }
  };

export const listUsers = () => async (dispatch: any, getState: any) => {
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    dispatch({ type: USER_GET_REQUEST });
    const { data } = await Axios.get('/api/users/userlist', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_GET_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({ type: USER_GET_FAIL, payload: error.response.data });
  }
};
