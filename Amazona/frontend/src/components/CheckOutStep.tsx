import { FC } from 'react';

const CheckOutStep: FC<any> = (props: any): JSX.Element => {
  return (
    <div className='row checkout-steps'>
      <div className={props.step1 ? 'active' : ''}>Signin</div>
      <div className={props.step2 ? 'active' : ''}>Shipping</div>
      <div className={props.step3 ? 'active' : ''}>Payment</div>
      <div className={props.step4 ? 'active' : ''}>Place Order</div>
    </div>
  );
};
export default CheckOutStep;
