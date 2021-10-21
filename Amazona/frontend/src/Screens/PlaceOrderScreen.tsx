import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckOutStep';
import { ORDER_CREATE_RESET } from '../constants/orderConstant';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';
import { texte } from '../data';
import MesssageBox from '../components/MesssageBox';

const PlaceOrderScreen: FC<any> = (props: any): JSX.Element => {
  const cart = useSelector((state: any) => state.cart);
  // * Il conserve dans cart pour écrire directement dedans ( Faster )

  const toPrice = (num: any) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a: any, c: any) => a + c.qty * c.price, 0)
  );
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }
  const orderCreate = useSelector((state: any) => state.orderCreate);
  const { loading, success, order, error } = orderCreate;
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: ORDER_CREATE_RESET });
      props.history.push(`/order/${order._id}`);
    }
  }, [dispatch, order, props.history, success]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MesssageBox variant='danger' text={error} />
  ) : (
    <div style={{ display: 'flex' }}>
      <div className='table-users placeorder-info' style={{ width: 'auto' }}>
        <div className='header'>INTELS</div>
        <table className='table'>
          <tr className='table-tr'>
            <td className='table-td'>Name</td>
            <td className='table-td'> {cart.shippingAddress.fullName}</td>
          </tr>
          <tr className='table-tr'>
            <td className='table-td'>Address</td>
            <td className='table-td'> {cart.shippingAddress.address}</td>
          </tr>
          <tr className='table-tr'>
            <td className='table-td'>City</td>
            <td className='table-td'> {cart.shippingAddress.city}</td>
          </tr>
          <tr className='table-tr'>
            <td className='table-td'>Postal Code</td>
            <td className='table-td'> {cart.shippingAddress.postalCode}</td>
          </tr>
          <tr className='table-tr'>
            <td className='table-td'>Country</td>
            <td className='table-td'> {cart.shippingAddress.country}</td>
          </tr>
          <tr className='table-tr'>
            <td className='table-td'>Payment Method</td>
            <td className='table-td'> {cart.paymentMethod}</td>
          </tr>
        </table>
        <div className='header'>Cart</div>
        <table className='table'>
          {cart.cartItems.length === 0 ? (
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
              {cart.cartItems.map((item: any) => (
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
              <td className='table-td'>${cart.itemsPrice}</td>
            </tr>
            <tr className='table-tr'>
              <td className='table-td'>Shipping</td>
              <td className='table-td'>${cart.shippingPrice}</td>
            </tr>
            <tr className='table-tr'>
              <td className='table-td'>Tax</td>
              <td className='table-td'>${cart.taxPrice}</td>
            </tr>
            <tr className='table-tr'>
              <td className='table-td'>Order Total</td>
              <td className='table-td'>${cart.totalPrice}</td>
            </tr>
          </table>
          <div>
            <button
              className='button primary full-width'
              onClick={() => placeOrderHandler()}
            >
              {' '}
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlaceOrderScreen;
