import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePayment } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckOutStep";
// *fait Centrer les méthodes de paiement
export default function PaymentScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment(paymentMethod));
    props.history.push("placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3>
        {" "}
      </CheckoutSteps>

      <form className="form" onSubmit={submitHandler}>
        <div>
          <h2 className="text-center">Payment method</h2>
        </div>

        <div>
          <div className="text-center">
            <input
              type="radio"
              value="paypal"
              name="paymentMethod"
              required
              checked
              id="paymentMethod"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paymentMethod">Paypal</label>
          </div>
          <br />
          <div className="text-center">
            <input
              type="radio"
              value="stripe"
              name="paymentMethod"
              id="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paymentMethod">Stripe</label>
          </div>
        </div>
        <br />
        <div>
          <button type="submit" className=" button primary">
            Continue{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
