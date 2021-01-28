import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckOutStep";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;

  console.log("CART", cart);

  if (!shipping.address) {
    console.log(shipping.address);
    props.history.push("/shipping");
  } else if (!payment) {
    props.history.push("/payment");
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = () => {
    // *  Create an order
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  useEffect(() => {}, []);

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

              {cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                cartItems.map((item) => (
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
              <div>${itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>${shippingPrice}</div>
            </li>
            <li>
              <div>Tax</div>
              <div>${taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${totalPrice}</div>
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
          </ul>
        </div>
      </div>
    </div>
  );
}
