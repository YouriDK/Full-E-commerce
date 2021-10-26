import React, { useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { saveShipping } from '../../Redux/actions/cartActions';
import CheckoutSteps from '../components/CheckOutStep';
import CustomInput from '../components/CustomInput';

const ShippingScreen: FC<any> = (props: any): JSX.Element => {
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push('/signin');
  }

  const cart = useSelector((state: any) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [fullName, setfullName] = useState(shippingAddress.fullName);
  const [city, setCity] = useState(shippingAddress.city);
  const [country, setCountry] = useState(shippingAddress.country);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const dispatch = useDispatch();

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(saveShipping({ fullName, address, city, postalCode, country }));
    props.history.push('/payment');
  };

  return (
    <>
      <CheckoutSteps step={1} /*current='process'*/ />
      <form className='form' onSubmit={submitHandler}>
        <CustomInput
          variable={fullName}
          name='fullName'
          label='Full name'
          type='text'
          change={setfullName}
          placeholder='Enter full name'
        />
        <CustomInput
          variable={address}
          name='address'
          label='Address'
          type='text'
          change={setAddress}
          placeholder='Enter address'
        />

        <CustomInput
          variable={city}
          name='city'
          label='City'
          type='text'
          change={setCity}
          placeholder='Enter city'
        />
        <CustomInput
          variable={postalCode}
          name='postalCode'
          label='Postal Code'
          type='number'
          change={setPostalCode}
          placeholder={'00000'}
        />
        <CustomInput
          variable={country}
          name='country'
          label='Country'
          type='text'
          change={setCountry}
          placeholder='Enter country'
        />
        <br />
        <div>
          <Button type='submit' className='primary '>
            Continue
          </Button>
        </div>
      </form>
    </>
  );
};
export default ShippingScreen;
