import React, { useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { saveShipping } from '../redux/actions/cartActions';
import CheckoutSteps from '../components/CheckOutStep';
import CustomInput from '../components/CustomInput';

const ShippingScreen: FC<any> = (props: any): JSX.Element => {
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push('/signin');
  }

  const cart = useSelector((state: any) => state.cart);
  const { shipping_address } = cart;

  const [address, setAddress] = useState(shipping_address.address);
  const [name, setName] = useState(shipping_address.name);
  const [city, setCity] = useState(shipping_address.city);
  const [country, setCountry] = useState(shipping_address.country);
  const [postal_code, setPostalCode] = useState(shipping_address.postal_code);
  const dispatch = useDispatch();

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(saveShipping({ name, address, city, postal_code, country }));
    props.history.push('/payment');
  };

  return (
    <>
      <CheckoutSteps step={1} /*current='process'*/ />
      <form className='form' onSubmit={submitHandler}>
        <CustomInput
          variable={name}
          name='name'
          label='Full name'
          type='text'
          change={setName}
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
          variable={postal_code}
          name='postal_code'
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
