import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckOutStep';
import { ORDER_CREATE_RESET } from '../constants/orderConstant';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';

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
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4>
        {' '}
      </CheckoutSteps>
      <div className='placeorder'>
        <div className='placeorder-info'>
          <div>
            <h3 className='font-title'> Shipping</h3>{' '}
            <div>
              <strong>Name : </strong>
              <span className='font-list'>
                {cart.shippingAddress.fullName}{' '}
              </span>
              <br />
              <strong>Address : </strong>{' '}
              <span className='font-list'>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}{' '}
              </span>
            </div>
          </div>
          <div>
            <h3 className='font-title'> Payment</h3>
            <div>
              {' '}
              <strong>Payment Method :</strong>{' '}
              <span className='font-list'>{cart.payment}. </span>{' '}
            </div>
          </div>
          <div>
            <ul className='cart-list-container'>
              <li>
                <h3 className='font-title'>Shopping Cart</h3>
              </li>

              {cart.cartItems.length === 0 ? (
                <div className='font-title'>Cart is empty</div>
              ) : (
                cart.cartItems.map((item: any) => (
                  <li key={item.product}>
                    <div className='row full-width'>
                      <div>
                        <img className='small' src={item.image} alt='product' />
                      </div>
                      <div className='min-30 font-list'>
                        <Link to={'/product/' + item.product}>{item.name}</Link>
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

        <div className='placeorder-action'>
          <h3 className='center font-title'>Order Summary</h3>
          <ul>
            <li>
              <strong>Items</strong>
              <div className='font-list'>${cart.itemsPrice}</div>
            </li>
            <li>
              <strong>Shipping</strong>
              <div className='font-list'>${cart.shippingPrice}</div>
            </li>
            <li>
              <strong>Tax</strong>
              <div className='font-list'>${cart.taxPrice}</div>
            </li>
            <li>
              <strong>Order Total</strong>
              <div className='font-list'>${cart.totalPrice}</div>
            </li>
            <div>
              <button
                className='button primary full-width'
                onClick={() => placeOrderHandler()}
              >
                {' '}
                Place Order
              </button>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant='danger' text={error} />}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default PlaceOrderScreen;
