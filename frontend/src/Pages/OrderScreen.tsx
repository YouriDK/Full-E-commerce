import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deliverOrder,
  detailsOrder,
  payOrder,
} from '../redux/actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';
import { PayPalButton } from 'react-paypal-button-v2';
import Axios from 'axios';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../redux/constants/orderConstant';
import MesssageBox from '../components/MesssageBox';
import { Button } from 'reactstrap';
export interface DisplayDataProps {
  title: string;
  value: string;
}
const OrderScreen: FC<any> = (props: any): JSX.Element => {
  const [sdkReady, setSdkReady] = useState(false);
  const isMobile = useSelector((state: any) => state.isMobile.isMobile);

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
      console.log('GET Order');
      if (order._id !== orderId) {
        console.log('GET ROder 5555');
        dispatch(detailsOrder(orderId));
      }
    }
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/paypal');

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
    console.log('order', order);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult: any) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };
  const displayData: DisplayDataProps[] = [
    { title: 'Name', value: order?.shipping_address?.name ?? '' },
    { title: 'Address', value: order?.shipping_address?.address ?? '' },
    { title: 'City', value: order?.shipping_address?.city ?? '' },
    { title: 'Postal Code', value: order?.shipping_address?.postal_code ?? '' },
    { title: 'Country', value: order?.shipping_address?.country ?? '' },
    { title: 'Payment Method', value: order?.payment_method ?? '' },
  ];
  const tableDatas: DisplayDataProps[] = [
    { title: 'Items', value: order?.items_price },
    { title: 'Shipping', value: order?.shipping_price },
    { title: 'Tax', value: order?.tax_price },
    { title: 'Order Total', value: order?.total_price },
  ];
  const tdDatas = ['Item', 'Name', 'Cost'];

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MesssageBox variant='danger' error={error} />
  ) : (
    <div
      style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}
    >
      <div
        className={`table-users ${isMobile ? '' : 'placeorder-info'}`}
        style={{ width: 'auto' }}
      >
        <div className='header'>Shipping</div>
        <table className='table'>
          <tbody>
            {displayData.map((data: DisplayDataProps) => (
              <tr className='table-tr'>
                <td className='table-td font-secondary large xbold'>
                  {data.title}
                </td>
                <td className='table-td font-secondary large xbold'>
                  {data.value}
                </td>{' '}
              </tr>
            ))}
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
            {order.order_items.length === 0 ? (
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
                  {tdDatas.map((label: string) => (
                    <td className='table-td font-secondary large xbold'>
                      {label}
                    </td>
                  ))}
                </tr>
                {order.order_items.map((item: any, index: number) => (
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
                      {item.quantity} x ${item.price} = $
                      {item.quantity * item.price}
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
              {tableDatas.map((data: DisplayDataProps) => (
                <tr className='table-tr'>
                  <td className='table-td font-secondary large xbold'>
                    {data.title}
                  </td>
                  <td className='table-td font-secondary large xbold'>
                    {data.value}
                  </td>{' '}
                </tr>
              ))}
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
                amount={order.total_price}
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
