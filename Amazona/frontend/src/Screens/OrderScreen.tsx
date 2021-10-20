import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';
import { PayPalButton } from 'react-paypal-button-v2';
import Axios from 'axios';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstant';
import MesssageBox from '../components/MesssageBox';

const OrderScreen: FC<any> = (props: any): JSX.Element => {
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state: any) => state.orderDetails);
  const userSignin = useSelector((state: any) => state.userSignin);
  const userInfo = userSignin;
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state: any) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state: any) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();

  useEffect(() => {
    // ! Pour avoir la commande actuel il faut actualiser la page donc :
    if (order != undefined) {
      if (order._id !== orderId) {
        dispatch(detailsOrder(orderId));
      }
    }
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');

      // * Il faut créer un script pour utiliser Paypal
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script); // *  Ajout du script dans la page HTML en dernier
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult: any) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MesssageBox variant='danger' text={error} />
  ) : (
    <div style={{ display: 'flex' }}>
      <div className='table-users placeorder-info' style={{ width: 'auto' }}>
        <div className='header'>Shipping</div>
        <table className='table'>
          <tr className='table-tr'>
            <td className='table-td'>Name</td>
            <td className='table-td'> {order.shippingAddress.fullName}</td>
          </tr>
          <tr className='table-tr'>
            <td className='table-td'>Address</td>
            <td className='table-td'> {order.shippingAddress.address}</td>
          </tr>
          <tr className='table-tr'>
            <td className='table-td'>City</td>
            <td className='table-td'> {order.shippingAddress.city}</td>
          </tr>
          <tr className='table-tr'>
            <td className='table-td'>Postal Code</td>
            <td className='table-td'> {order.shippingAddress.postalCode}</td>
          </tr>
          <tr className='table-tr'>
            <td className='table-td'>Country</td>
            <td className='table-td'> {order.shippingAddress.country}</td>
          </tr>
          <tr className='table-tr'>
            <td className='table-td'>Payment Method</td>
            <td className='table-td'> {order.paymentMethod}</td>
          </tr>
        </table>
        <div>
          {' '}
          {order.isDelivered ? (
            <MessageBox
              variant='success'
              text={`Delivered at ${order.deliveredAt}`}
            />
          ) : (
            <MessageBox variant='danger' text={`Not Delivered`} />
          )}
        </div>
        <div className='header'>Order</div>
        <table className='table'>
          {order.orderItems.length === 0 ? (
            <tr className='table-tr'>
              <td className='table-td'>Cart is Empty</td>
              <td className='table-td'> Go Shopping</td>
            </tr>
          ) : (
            <>
              <tr className='table-tr'>
                <td className='table-td'>Item</td>
                <td className='table-td'> Name</td>
                <td className='table-td'> Cost</td>
              </tr>
              {order.orderItems.map((item: any) => (
                <tr className='table-tr'>
                  <td className='table-td'>
                    {' '}
                    <img className='small' src={item.image} alt='product' />
                  </td>
                  <td className='table-td'>
                    {' '}
                    <Link to={'/product/' + item.product}>{item.name}</Link>
                  </td>
                  <td className='table-td'>
                    {' '}
                    {item.qty} x ${item.price} = ${item.qty * item.price}
                  </td>
                </tr>
              ))}
            </>
          )}
        </table>
      </div>
      <div className='placeorder-action'>
        <div className='table-users'>
          <div className='header'>Order Summary</div>
          <table className='table'>
            <tr className='table-tr'>
              <td className='table-td'>Items</td>
              <td className='table-td'>${order.itemsPrice}</td>
            </tr>
            <tr className='table-tr'>
              <td className='table-td'>Shipping</td>
              <td className='table-td'>${order.shippingPrice}</td>
            </tr>
            <tr className='table-tr'>
              <td className='table-td'>Tax</td>
              <td className='table-td'>${order.taxPrice}</td>
            </tr>
            <tr className='table-tr'>
              <td className='table-td'>Order Total</td>
              <td className='table-td'>${order.totalPrice}</td>
            </tr>
          </table>
          <div>
            {' '}
            {order.isPaid ? (
              <MessageBox
                variant='success'
                text={`Delivered at ${order.paidAt}`}
              />
            ) : (
              <MessageBox variant='danger' text={`Not Paid`} />
            )}
          </div>
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
        </div>
      </div>
    </div>
  );
};
export default OrderScreen;
