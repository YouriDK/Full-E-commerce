import {
  CART_ADD_ITEM,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT,
  CART_SAVE_SHIPPING,
} from "../constants/cartConstants";

function cartReducers(
  state = { cartItems: [], shipping: {}, payment: {} },
  action
) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      if (product) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? item : x
          ),
        };
      }
      return { ...state, cartItems: [...state.cartItems, item] };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING:
      // * C'est avec ShippingAddress qu'on va transporter les informations
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload };
    case CART_EMPTY:
      return { ...state, cartItems: [] };

    default:
      return state;
  }
}

export { cartReducers };
