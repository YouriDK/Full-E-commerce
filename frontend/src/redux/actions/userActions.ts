import Axios from 'axios';
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
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from '../constants/userConstants';

export const signin = (email: any, password: any) => async (dispatch: any) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post('/users/signin', {
      email,
      password,
    });
    console.log('signin user ❤');
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
  console.log('Login');

  try {
    // const { data } = await Axios.post('/login/google', {
    //   token: googleData.tokenId,
    // });
    const data = console.log('REDIRECT');
    await Axios.get('/login/google', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
    console.log('GOT LOGGED');
    // const data = {};
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

export const register =
  (name: any, email: any, password: any) => async (dispatch: any) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { name, email, password },
    });
    try {
      const { data } = await Axios.post('/users/register', {
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
      const { data } = await Axios.get(`/users/${userId}`, {
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
      const { data } = await Axios.put(`/users/profile`, user, {
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
    const { data } = await Axios.get('/users/userlist', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_GET_SUCCESS, payload: data });
  } catch (error: any) {
    dispatch({ type: USER_GET_FAIL, payload: error.response.data });
  }
};
