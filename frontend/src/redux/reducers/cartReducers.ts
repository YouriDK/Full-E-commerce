import {
  CART_ADD_ITEM,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT,
  CART_SAVE_SHIPPING,
} from '../constants/cartConstants';

function cartReducers(
  state = { cartItems: [], shipping: {}, payment: {} },
  action: any
) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product: any = state.cartItems.find(
        (x: any) => x.product === item.product
      );
      if (product) {
        return {
          ...state,
          cartItems: state.cartItems.map((x: any) =>
            x.product === product.product ? item : x
          ),
        };
      }
      return { ...state, cartItems: [...state.cartItems, item] };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x: any) => x.product !== action.payload
        ),
      };
    case CART_SAVE_SHIPPING:
      // * C'est avec shipping_address qu'on va transporter les informations
      return { ...state, shipping_address: action.payload };
    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload };
    case CART_EMPTY:
      return { ...state, cartItems: [] };

    default:
      return state;
  }
}

export { cartReducers };
