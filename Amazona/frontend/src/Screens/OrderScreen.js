import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  console.log("DATA DATA - ", orderDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id} </h1>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3> Shipping</h3>{" "}
            <div>
              <strong>Name : </strong>
              {order.shippingAddress.fullName} <br />
              <strong>Address : </strong> {order.shippingAddress.address},{" "}
              {order.shippingAddress.city},{order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}{" "}
            </div>
            {order.isDelivered ? (
              <MessageBox variant="success">
                Delivered at {order.deliveredAt}{" "}
              </MessageBox>
            ) : (
              <MessageBox variant="danger"> Not Delivered </MessageBox>
            )}
          </div>
          <div>
            <h3> Payment</h3>
            <div> Payment Method : {order.paymentMethod}. </div>
            {order.isPaid ? (
              <MessageBox variant="success">
                Delivered at {order.paidAt}{" "}
              </MessageBox>
            ) : (
              <MessageBox variant="danger"> Not Paid </MessageBox>
            )}
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Shopping Cart</h3>
              </li>

              {order.orderItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                order.orderItems.map((item) => (
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
              <div>${order.itemsPrice}</div>
            </li>
            <li>
              <div>Shipping</div>
              order{" "}
            </li>
            <li>
              <div>Tax</div>
              <div>${order.taxPrice}</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>${order.totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
