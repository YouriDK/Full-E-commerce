import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deliverOrder,
  detailsOrder,
  payOrder,
} from '../../Redux/actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';
import { PayPalButton } from 'react-paypal-button-v2';
import Axios from 'axios';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../../Redux/constants/orderConstant';
import MesssageBox from '../components/MesssageBox';
import { Button } from 'reactstrap';

const OrderScreen: FC<any> = (props: any): JSX.Element => {
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state: any) => state.orderDetails);
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state: any) => state.orderPay);
  const { success: successPay } = orderPay;
  const orderDeliver = useSelector((state: any) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();

  useEffect(() => {
    // ! Pour avoir la commande actuel il faut actualiser la page donc :
    if (order !== undefined) {
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
          <tbody>
            <tr className='table-tr'>
              <td className='table-td font-secondary large xbold'>Name</td>
              <td className='table-td font-secondary large xbold'>
                {' '}
                {order.shippingAddress.fullName}
              </td>
            </tr>
            <tr className='table-tr'>
              <td className='table-td font-secondary large xbold'>Address</td>
              <td className='table-td font-secondary large xbold'>
                {' '}
                {order.shippingAddress.address}
              </td>
            </tr>
            <tr className='table-tr'>
              <td className='table-td font-secondary large xbold'>City</td>
              <td className='table-td font-secondary large xbold'>
                {' '}
                {order.shippingAddress.city}
              </td>
            </tr>
            <tr className='table-tr'>
              <td className='table-td font-secondary large xbold'>
                Postal Code
              </td>
              <td className='table-td font-secondary large xbold'>
                {' '}
                {order.shippingAddress.postalCode}
              </td>
            </tr>
            <tr className='table-tr'>
              <td className='table-td font-secondary large xbold'>Country</td>
              <td className='table-td font-secondary large xbold'>
                {' '}
                {order.shippingAddress.country}
              </td>
            </tr>
            <tr className='table-tr'>
              <td className='table-td font-secondary large xbold'>
                Payment Method
              </td>
              <td className='table-td font-secondary large xbold'>
                {' '}
                {order.paymentMethod}
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          {' '}
          {order.isDelivered ? (
            <MessageBox
              variant='success'
              text={`Delivered at ${new Date(
                order.deliveredAt
              ).toDateString()}`}
            />
          ) : (
            <MessageBox variant='danger' text={`Not Delivered`} />
          )}
        </div>
        <div className='header'>Order</div>
        <table className='table'>
          <tbody>
            {order.orderItems.length === 0 ? (
              <tr className='table-tr'>
                <td className='table-td'>Cart is Empty</td>
                <Link
                  to='/'
                  className='table-td link font-secondary large xbold'
                >
                  {' '}
                  Go Shopping
                </Link>
              </tr>
            ) : (
              <>
                <tr className='table-tr'>
                  <td className='table-td font-secondary large xbold'>Item</td>
                  <td className='table-td font-secondary large xbold'> Name</td>
                  <td className='table-td font-secondary large xbold'> Cost</td>
                </tr>
                {order.orderItems.map((item: any, index: number) => (
                  <tr className='table-tr' key={index}>
                    <td className='table-td'>
                      {' '}
                      <img className='small' src={item.image} alt='product' />
                    </td>
                    <td className='table-td'>
                      {' '}
                      <Link
                        className='link font-secondary large xbold'
                        to={'/product/' + item.product}
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className='table-td font-secondary large xbold'>
                      {' '}
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className='placeorder-action'>
        <div className='table-users'>
          <div className='header'>Order Summary</div>
          <table className='table'>
            <tbody>
              <tr className='table-tr'>
                <td className='table-td font-secondary large xbold'>Items</td>
                <td className='table-td font-secondary large xbold'>
                  ${order.itemsPrice}
                </td>
              </tr>
              <tr className='table-tr'>
                <td className='table-td font-secondary large xbold'>
                  Shipping
                </td>
                <td className='table-td font-secondary large xbold'>
                  ${order.shippingPrice}
                </td>
              </tr>
              <tr className='table-tr'>
                <td className='table-td font-secondary large xbold'>Tax</td>
                <td className='table-td font-secondary large xbold'>
                  ${order.taxPrice}
                </td>
              </tr>
              <tr className='table-tr'>
                <td className='table-td font-secondary large xbold'>
                  Order Total
                </td>
                <td className='table-td font-secondary large xbold'>
                  ${order.totalPrice}
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            {!sdkReady && order.isPaid ? (
              <MessageBox
                variant='success'
                text={`Paid the ${new Date(order.paidAt).toDateString()}`}
              />
            ) : (
              <PayPalButton
                amount={order.totalPrice}
                onSuccess={successPaymentHandler}
              />
            )}
            {userInfo.admin && order.isPaid && !order.isDelivered && (
              <>
                {loadingDeliver && <LoadingBox />}
                {errorDeliver && (
                  <MessageBox variant='danger' text={errorDeliver} />
                )}
                <Button
                  type='button'
                  className='primary block'
                  onClick={deliverHandler}
                >
                  {' '}
                  Deliver Order
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderScreen;
