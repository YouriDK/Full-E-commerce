import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PayPalButton } from "react-paypal-button-v2";
import Axios from "axios";
/*
 *fait  Espacer Nom et adresse ainsi que les alerts
 *fait  Centrer Order *** ou ne pas mettre la réf de l'ordre
 *fait  Aligner bouton et compteur
 *fait  Agrandir le texte du nom du produit et le prix
 */
export default function OrderScreen(props) {
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);

  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    // ! Pour avoir la commande actuel il faut actualiser la page donc :
    if (order != undefined) {
      if (order._id !== orderId) {
        dispatch(detailsOrder(orderId));
      }
    }
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");

      // * Il faut créer un script pour utiliser Paypal
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script); // *  Ajout du script dans la page HTML en dernier
    };
    if (!order) {
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        //* Si le paiement n'est pas encore fait

        if (!window.paypal) {
          //* si la page n'est pas encore chargé
          addPayPalScript(); // * On charge le script
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady]);

  const successPaymentHandler = () => {
    // TODO : config the success Payment
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1 className="full-width font-title text-center ">Order {order._id} </h1>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3 className="font-title"> Shipping</h3>{" "}
            <div>
              <strong>Name : </strong>
              <span className="font-list">
                {order.shippingAddress.fullName}
              </span>{" "}
              <br />
              <strong>Address : </strong>{" "}
              <span className="font-list">
                {" "}
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}{" "}
              </span>
            </div>
            <br />
            {order.isDelivered ? (
              <MessageBox variant="success">
                Delivered at {order.deliveredAt}{" "}
              </MessageBox>
            ) : (
              <MessageBox variant="danger"> Not Delivered </MessageBox>
            )}
          </div>
          <div>
            <h3 className="font-title"> Payment</h3>
            <div>
              {" "}
              <strong>Payment Method : </strong>{" "}
              <span className="font-list">{order.paymentMethod}.</span>{" "}
            </div>
            <br />
            {order.isPaid ? (
              <MessageBox variant="success">
                Delivered at {order.paidAt}{" "}
              </MessageBox>
            ) : (
              <MessageBox variant="danger"> Not Paid </MessageBox>
            )}
          </div>
          <div>
            <h3 className="font-title">Order Items</h3>
            <ul className="cart-list-container">
              {order.orderItems.length === 0 ? (
                <div className="font-title">Cart is empty</div>
              ) : (
                order.orderItems.map((item) => (
                  <li key={item.product}>
                    <div className="row full-width">
                      <img className="small" src={item.image} alt="product" />

                      <div className="min-30 font-list">
                        <Link to={"/product/" + item.product}>{item.name}</Link>
                      </div>
                      <div className="font-list">
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
          <h3 className="center font-title">Order Summary</h3>
          <ul>
            <li>
              <strong>Items</strong>
              <div className="font-list">${order.itemsPrice}</div>
            </li>
            <li>
              <strong>Shipping</strong>
              <span className="font-list">Order </span>
            </li>
            <li>
              <strong>Tax</strong>
              <div className="font-list">${order.taxPrice}</div>
            </li>
            <li>
              <strong>Order Total</strong>
              <div className="font-list">${order.totalPrice}</div>
            </li>
            {!order.isPaid && (
              <div>
                {!sdkReady ? (
                  <LoadingBox></LoadingBox>
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  ></PayPalButton>
                )}
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
