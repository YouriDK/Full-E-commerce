import { FC } from 'react';
import { Stepper, Step } from 'react-form-stepper';

interface StepProps {
  step: number;
  error?: boolean;
}
const styleConf = {
  activeBgColor: '#ff9f1c',
  activeTextColor: '#2c6e49',
  labelFontSize: '1.5em',
  completedBgColor: '#ff9f1c',
  completedTextColor: '#2c6e49',
  inactiveBgColor: '#a19f9f',
  inactiveTextColor: '#000000',
  size: '2em',
  circleFontSize: '1.2em',
  borderRadius: '60px',
  fontWeight: '100',
};
const CheckOutStep: FC<StepProps> = ({ step, error }): JSX.Element => {
  return (
    <Stepper
      activeStep={step}
      className='font-button'
      connectorStateColors
      styleConfig={styleConf}
    >
      <Step label='Sign In' />
      <Step label='Shipping' />
      <Step label='Payment' />
      <Step label='Place Order' />
    </Stepper>
  );
};
export default CheckOutStep;
