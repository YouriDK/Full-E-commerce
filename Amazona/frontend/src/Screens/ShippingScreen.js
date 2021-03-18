import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShipping } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckOutStep";

export default function ShippingScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push("/signin");
  }

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [fullName, setfullName] = useState(shippingAddress.fullName);
  const [city, setCity] = useState(shippingAddress.city);
  const [country, setCountry] = useState(shippingAddress.country);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ fullName, address, city, postalCode, country }));
    props.history.push("/payment");
  };

  return (
    <div>
      <CheckoutSteps step1 step2>
        {" "}
      </CheckoutSteps>

      <form className="form" onSubmit={submitHandler}>
        <div>
          <h2 className="text-center">Shipping address</h2>
        </div>
        <div>
          <label htmlFor="fullName">Full name</label>
          <input
            placeholder="Enter full name"
            type="text"
            name="fullName"
            id="fullName"
            onChange={(e) => setfullName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            placeholder="Enter address"
            type="text"
            name="address"
            id="address"
            onChange={(e) => setAddress(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            placeholder="Enter city"
            type="text"
            name="city"
            id="city"
            onChange={(e) => setCity(e.target.value)}
          ></input>
        </div>

        <div>
          <label htmlFor="postal-code">Postal Code</label>
          <input
            placeholder="Enter postal code"
            type="numeric"
            name="postalCode"
            id="postalCode"
            onChange={(e) => setPostalCode(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            placeholder="Enter country"
            type="text"
            name="country"
            id="country"
            onChange={(e) => setCountry(e.target.value)}
          ></input>
        </div>

        <div>
          <label></label>
          <button type="submit" className=" button primary">
            Continue{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
