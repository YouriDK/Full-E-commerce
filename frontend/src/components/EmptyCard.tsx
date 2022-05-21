import { FC } from 'react';
import { PacmanLoader } from 'react-spinners';
import { CSS } from '../data';
const EmptyCard: FC<any> = (): JSX.Element => {
  return (
    <>
      <span>Cart is empy...</span> <br />
      <PacmanLoader color='#2ec4b6' loading css={CSS} size={100} />
    </>
  );
};
export default EmptyCard;
