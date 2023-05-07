import Axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from '../constants/cartConstants';

const addToCart =
  (productId: any, quantity: any) => async (dispatch: any, getState: any) => {
    try {
      const { data } = await Axios.get('/products/' + productId)
        .then((res: any) => res)
        .catch((err: any) => console.log(err));
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          name: data.name,
          product: data._id,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          quantity,
        },
      });

      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error: any) {
      console.log('error', error.response);
    }
  };

const removeFromCart = (productId: any) => (dispatch: any, getState: any) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
const saveShipping = (data: any) => (dispatch: any) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
  localStorage.setItem('shipping_address', JSON.stringify(data));
};

const savePayment = (data: any) => (dispatch: any) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};

export { addToCart, removeFromCart, saveShipping, savePayment };
