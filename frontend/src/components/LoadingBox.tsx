import { FC } from 'react';
import { BeatLoader } from 'react-spinners';
import { secondColor } from '../data';

const LoadingBox: FC<any> = (): JSX.Element => {
  return (
    <div
      style={{ marginTop: '20%', display: 'flex', justifyContent: 'center' }}
    >
      <span
        className='font-footer'
        style={{ color: secondColor, fontSize: '6rem', marginTop: '-40px' }}
      >
        Loading
      </span>
      <BeatLoader color={secondColor} size={20} />
    </div>
  );
};
export default LoadingBox;
