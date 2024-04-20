import { useFormik } from 'formik';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import * as Yup from 'yup';
import CheckoutSteps from '../components/CheckOutStep';
import { saveShipping } from '../redux/actions/cartActions';
import { AppDispatch } from '../redux/store';
const ShippingScreen: FC<any> = (): JSX.Element => {
  const userSignin = useSelector((state: any) => state.userSignin);
  const isMobile = useSelector((state: any) => state.isMobile.isMobile);
  const letsGoTo = useNavigate();
  const { userInfo } = userSignin;
  if (!userInfo) {
    letsGoTo('/signin');
  }

  const cart = useSelector((state: any) => state.cart);
  const { shipping_address } = cart;

  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: shipping_address.name ?? '',
      address: shipping_address.address ?? '',
      city: shipping_address.city ?? '',
      postal_code: shipping_address.postal_code ?? '',
      country: shipping_address.country ?? '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      image: Yup.string(),
      brand: Yup.string(),
      countInStock: Yup.string(),
      category: Yup.string(),
      description: Yup.string(),
      rating: Yup.number(),
      numReviews: Yup.number(),
    }),
    onSubmit: async (values: any) => {
      dispatch(saveShipping({ ...values }));
      letsGoTo('/payment');
    },
  });
  return (
    <>
      {!isMobile && <CheckoutSteps step={1} /*current='process'*/ />}
      <form className='form' onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor={formik.getFieldProps('name').name}>
            <span>{'Name'}</span>
          </label>
          <input
            placeholder='Enter full name'
            {...formik.getFieldProps('name')}
          ></input>
        </div>
        <div>
          <label htmlFor={formik.getFieldProps('address').name}>
            <span>{'Address'}</span>
          </label>
          <input
            placeholder='Enter address'
            {...formik.getFieldProps('address')}
          ></input>
        </div>
        <div>
          <label htmlFor={formik.getFieldProps('city').name}>
            <span>{'City'}</span>
          </label>
          <input
            placeholder='Enter city'
            {...formik.getFieldProps('city')}
          ></input>
        </div>
        <div>
          <label htmlFor={formik.getFieldProps('postal_code').name}>
            <span>{'Postal Code'}</span>
          </label>
          <input
            type='number'
            placeholder={'00000'}
            {...formik.getFieldProps('postal_code')}
          ></input>
        </div>
        <div>
          <label htmlFor={formik.getFieldProps('country').name}>
            <span>{'Country'}</span>
          </label>
          <input
            placeholder='Enter country'
            {...formik.getFieldProps('country')}
          ></input>
        </div>

        <div style={{ marginTop: '50px' }}>
          <Button type='submit' className='primary '>
            Continue
          </Button>
        </div>
      </form>
    </>
  );
};
export default ShippingScreen;