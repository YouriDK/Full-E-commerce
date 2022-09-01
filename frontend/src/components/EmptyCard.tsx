import { FC } from 'react';
import { PulseLoader } from 'react-spinners';
import { secondColor } from '../data';
const EmptyCard: FC<any> = (): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20%',
      }}
    >
      <PulseLoader color={secondColor} loading size={10} />
      <span
        className='font-footer'
        style={{ color: secondColor, fontSize: '6rem', marginTop: '-40px' }}
      >
        Cart is empty
      </span>
      <PulseLoader color={secondColor} loading size={10} />
    </div>
  );
};
export default EmptyCard;
