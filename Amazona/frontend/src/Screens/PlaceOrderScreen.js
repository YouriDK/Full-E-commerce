import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckOutStep";
import { ORDER_CREATE_RESET } from "../constants/orderConstant";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  // * Il conserve dans cart pour écrire directement dedans ( Faster )

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, order, error } = orderCreate;

  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4>
        {" "}
      </CheckoutSteps>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3> Shipping</h3>{" "}
            <div>
              <strong>Name : </strong>
              {cart.shipping.fullName} <br />
              <strong>Address : </strong> {cart.shipping.address},{" "}
              {cart.shipping.city},{cart.shipping.postalCode},{" "}
              {cart.shipping.country}{" "}
            </div>
          </div>
          <div>
            <h3> Payment</h3>
            <div> Payment Method : {cart.payment}. </div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Shopping Cart</h3>
              </li>

              {cart.cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                cart.cartItems.map((item) => (
                  <li key={item.product}>
                    <div className="row">
                      <div>
                        <img className="small" src={item.image} alt="product" />
                      </div>
                      <div className="min-30">
                        <Link to={"/product/" + item.product}>{item.name}</Link>
                      </div>
                      <div>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        <div className="placeorder-action">
          <ul>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${cart.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${cart.shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${cart.taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${cart.totalPrice}</div>
            </li>
            <div>
              <button
                className="button primary full-width"
                onClick={() => placeOrderHandler()}
              >
                {" "}
                Place Order
              </button>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          </ul>
        </div>
      </div>
    </div>
  );
}
