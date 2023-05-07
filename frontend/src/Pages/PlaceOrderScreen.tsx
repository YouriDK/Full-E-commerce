import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../redux/actions/orderActions';
import CheckoutSteps from '../components/CheckOutStep';
import { ORDER_CREATE_RESET } from '../redux/constants/orderConstant';
import LoadingBox from '../components/LoadingBox';

import MesssageBox from '../components/MesssageBox';
import { DisplayDataProps } from './OrderScreen';
import { AppDispatch } from '../redux/store';

const PlaceOrderScreen: FC<any> = (): JSX.Element => {
  const cart = useSelector((state: any) => state.cart);
  // * Il conserve dans cart pour écrire directement dedans ( Faster )
  const isMobile = useSelector((state: any) => state.isMobile.isMobile);

  const letsGoTo = useNavigate();
  const toPrice = (num: any) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.items_price = toPrice(
    cart.cartItems.reduce((a: any, c: any) => a + c.quantity * c.price, 0)
  );
  if (!cart.payment_method) {
    letsGoTo('/payment');
  }
  const orderCreate = useSelector((state: any) => state.orderCreate);
  const { loading, success, order, error } = orderCreate;
  cart.shipping_price = cart.items_price > 100 ? toPrice(0) : toPrice(10);
  cart.tax_price = toPrice(0.15 * cart.items_price);
  cart.total_price = cart.items_price + cart.shipping_price + cart.tax_price;

  const dispatch: AppDispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, order_items: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_CREATE_RESET });
      letsGoTo(`/order/${order._id}`);
    }
  }, [dispatch, letsGoTo, order, success]);

  const displayData: DisplayDataProps[] = [
    { title: 'Name', value: cart.shipping_address.name },
    { title: 'Address', value: cart.shipping_address.address },
    { title: 'City', value: cart.shipping_address.city },
    { title: 'Postal Code', value: cart.shipping_address.postal_code },
    { title: 'Country', value: cart.shipping_address.country },
    { title: 'Payment Method', value: cart.payment_method },
  ];

  const tableDatas: DisplayDataProps[] = [
    { title: 'Items', value: cart.items_price },
    { title: 'Shipping', value: cart.shipping_price },
    { title: 'Tax', value: cart.tax_price },
    { title: 'Order Total', value: cart.total_price },
  ];
  return (
    <>
      {!isMobile && <CheckoutSteps step={3} />}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MesssageBox variant='danger' error={error} />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <div
            className='table-users placeorder-info'
            style={{ width: 'auto' }}
          >
            <div className='header'>INTELS</div>
            <table className='table'>
              <tbody>
                {displayData.map((data: DisplayDataProps) => (
                  <tr className='table-tr'>
                    <td className='table-td font-secondary large xbold'>
                      {data.title}
                    </td>
                    <td className='table-td font-secondary large xbold'>
                      {' '}
                      {data.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='header'>Cart</div>
            <table className='table'>
              <tbody>
                {cart.cartItems.length === 0 ? (
                  <tr className='table-tr'>
                    <td className='table-td'>Cart is Empty</td>
                    <td className='table-td link font-secondary large xbold'>
                      {' '}
                      Go Shopping
                    </td>
                  </tr>
                ) : (
                  <>
                    <tr className='table-tr'>
                      <td className='table-td font-secondary large xbold'>
                        Item
                      </td>
                      <td className='table-td font-secondary large xbold'>
                        {' '}
                        Name
                      </td>
                      <td className='table-td font-secondary large xbold'>
                        {' '}
                        Cost
                      </td>
                    </tr>
                    {cart.cartItems.map((item: any, index: number) => (
                      <tr className='table-tr' key={index}>
                        <td className='table-td'>
                          {' '}
                          <img
                            className='small'
                            src={item.image}
                            alt='product'
                          />
                        </td>
                        <td className='table-td'>
                          {' '}
                          <Link
                            to={'/product/' + item.product}
                            className='link font-secondary large xbold'
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
                <button
                  className='button primary full-width font-primary bold xlarge'
                  onClick={() => placeOrderHandler()}
                >
                  {' '}
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default PlaceOrderScreen;
