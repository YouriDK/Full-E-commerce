import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePayment } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckOutStep";

export default function PaymentScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    console.log("PAS LA");
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();

  // ! If you don't put , [] at the end , he will start again over and over
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
          <div>
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
          <div>
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

        <div>
          <button type="submit" className=" button primary">
            Continue{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
