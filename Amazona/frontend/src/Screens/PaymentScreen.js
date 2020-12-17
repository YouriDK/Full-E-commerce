import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePayment } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckOutStep";

export default function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState("");

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
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2 className="text-center">Payment</h2>
            </li>

            <li>
              <div>
                <input
                  type="radio"
                  value="paypal"
                  name="paymentMethod"
                  id="paymentMethod"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></input>
                <label htmlFor="paymentMethod">Paypal</label>
              </div>
            </li>

            <li>
              <button type="submit" className=" button primary">
                Continue{" "}
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
