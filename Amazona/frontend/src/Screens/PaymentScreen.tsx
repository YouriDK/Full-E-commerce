import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckOutStep';

const PaymentScreen: FC<any> = (props: any): JSX.Element => {
  const cart = useSelector((state: any) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('Paypal');
  const dispatch = useDispatch();
  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(savePayment(paymentMethod));
    props.history.push('placeorder');
  };
  // TODO remplacer les input
  return (
    <div>
      <CheckoutSteps step={2} />

      <form className='form' onSubmit={submitHandler}>
        <div>
          <h2 className='text-center font-secondary xlarge xbold'>
            Payment method
          </h2>
        </div>

        <div>
          <div className='text-center '>
            <input
              type='radio'
              value='paypal'
              name='paymentMethod'
              required
              checked
              id='paymentMethod'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label className='xlarge bold' htmlFor='paymentMethod'>
              <span>Paypal</span>
            </label>
          </div>
          <br />
          <div className='text-center'>
            <input
              type='radio'
              value='stripe'
              name='paymentMethod'
              id='paymentMethod'
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label className='xlarge bold' htmlFor='paymentMethod'>
              <span>Stripe</span>
            </label>
          </div>
        </div>
        <br />
        <div>
          <button
            type='submit'
            className=' button primary font-primary large xbold'
          >
            Continue{' '}
          </button>
        </div>
      </form>
    </div>
  );
};
export default PaymentScreen;
