import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePayment } from '../redux/actions/cartActions';
import CheckoutSteps from '../components/CheckOutStep';
import { AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const PaymentScreen: FC<any> = (): JSX.Element => {
  const cart = useSelector((state: any) => state.cart);
  const isMobile = useSelector((state: any) => state.isMobile.isMobile);
  const letsGoTo = useNavigate();
  const { shipping_address } = cart;
  if (!shipping_address.address) {
    letsGoTo('/shipping');
  }
  const [payment_method, setpayment_method] = useState('Paypal');
  const dispatch: AppDispatch = useDispatch();
  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(savePayment(payment_method));
    letsGoTo('/placeorder');
  };
  return (
    <div>
      {!isMobile && <CheckoutSteps step={2} />}

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
              name='payment_method'
              required
              checked
              id='payment_method'
              onChange={(e) => setpayment_method(e.target.value)}
            ></input>
            <label className='xlarge bold' htmlFor='payment_method'>
              <span>Paypal/CB</span>
            </label>
          </div>
          <div className='text-center ' style={{ marginTop: '50px' }}>
            <input
              type='radio'
              value='paypal'
              name='payment_method'
              required
              disabled
              id='payment_method'
            ></input>
            <label className='xlarge bold' htmlFor='payment_method'>
              <span>Stripe (Available soon ...)</span>
            </label>
          </div>
          <br />
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
