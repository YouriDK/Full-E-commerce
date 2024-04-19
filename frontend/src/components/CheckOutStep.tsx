import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { FC } from 'react';

interface StepProps {
  step: number;
  error?: boolean;
}

const StepLabels = ['Shipping', 'Payment', 'Place Order'];

const CheckOutStep: FC<StepProps> = ({ step, error }): JSX.Element => {
  return (
    <Stepper
      activeStep={step}
      alternativeLabel
      style={{
        marginTop: '25px',
        width: '100%',
        fontWeight: '900',
        fontSize: '6em',
      }}
    >
      {StepLabels.map((label) => (
        <Step key={label} style={{ fontWeight: '100', fontSize: '2em' }}>
          <StepLabel style={{ fontWeight: '100', fontSize: '2em' }}>
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
export default CheckOutStep;
