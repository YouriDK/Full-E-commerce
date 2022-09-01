import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../redux/actions/orderActions';
import CheckoutSteps from '../components/CheckOutStep';
import { ORDER_CREATE_RESET } from '../redux/constants/orderConstant';
import LoadingBox from '../components/LoadingBox';

import MesssageBox from '../components/MesssageBox';

const PlaceOrderScreen: FC<any> = (props: any): JSX.Element => {
  const cart = useSelector((state: any) => state.cart);
  // * Il conserve dans cart pour écrire directement dedans ( Faster )

  const toPrice = (num: any) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.items_price = toPrice(
    cart.cartItems.reduce((a: any, c: any) => a + c.quantity * c.price, 0)
  );
  if (!cart.payment_method) {
    props.history.push('/payment');
  }
  const orderCreate = useSelector((state: any) => state.orderCreate);
  const { loading, success, order, error } = orderCreate;
  cart.shipping_price = cart.items_price > 100 ? toPrice(0) : toPrice(10);
  cart.tax_price = toPrice(0.15 * cart.items_price);
  cart.total_price = cart.items_price + cart.shipping_price + cart.tax_price;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, order_items: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_CREATE_RESET });
      props.history.push(`/order/${order._id}`);
    }
  }, [dispatch, order, props.history, success]);

  return (
    <>
      <CheckoutSteps step={3} />
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MesssageBox variant='danger' error={error} />
      ) : (
        <div style={{ display: 'flex' }}>
          <div
            className='table-users placeorder-info'
            style={{ width: 'auto' }}
          >
            <div className='header'>INTELS</div>
            <table className='table'>
              <tbody>
                <tr className='table-tr'>
                  <td className='table-td font-secondary large xbold'>Name</td>
                  <td className='table-td font-secondary large xbold'>
                    {' '}
                    {cart.shipping_address.name}
                  </td>
                </tr>
                <tr className='table-tr'>
                  <td className='table-td font-secondary large xbold'>
                    Address
                  </td>
                  <td className='table-td font-secondary large xbold'>
                    {' '}
                    {cart.shipping_address.address}
                  </td>
                </tr>
                <tr className='table-tr'>
                  <td className='table-td font-secondary large xbold '>City</td>
                  <td className='table-td font-secondary large xbold'>
                    {' '}
                    {cart.shipping_address.city}
                  </td>
                </tr>
                <tr className='table-tr'>
                  <td className='table-td font-secondary large xbold'>
                    Postal Code
                  </td>
                  <td className='table-td font-secondary large xbold'>
                    {' '}
                    {cart.shipping_address.postal_code}
                  </td>
                </tr>
                <tr className='table-tr'>
                  <td className='table-td font-secondary large xbold'>
                    Country
                  </td>
                  <td className='table-td font-secondary large xbold'>
                    {' '}
                    {cart.shipping_address.country}
                  </td>
                </tr>
                <tr className='table-tr'>
                  <td className='table-td font-secondary large xbold'>
                    Payment Method
                  </td>
                  <td className='table-td font-secondary large xbold'>
                    {' '}
                    {cart.payment_method}
                  </td>
                </tr>
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
                  <tr className='table-tr'>
                    <td className='table-td font-secondary large xbold'>
                      Items
                    </td>
                    <td className='table-td font-secondary large xbold'>
                      ${cart.items_price}
                    </td>
                  </tr>
                  <tr className='table-tr'>
                    <td className='table-td font-secondary large xbold'>
                      Shipping
                    </td>
                    <td className='table-td font-secondary large xbold'>
                      ${cart.shipping_price}
                    </td>
                  </tr>
                  <tr className='table-tr'>
                    <td className='table-td font-secondary large xbold'>Tax</td>
                    <td className='table-td font-secondary large xbold'>
                      ${cart.tax_price}
                    </td>
                  </tr>
                  <tr className='table-tr'>
                    <td className='table-td font-secondary large xbold'>
                      Order Total
                    </td>
                    <td className='table-td font-secondary large xbold'>
                      ${cart.total_price}
                    </td>
                  </tr>
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
