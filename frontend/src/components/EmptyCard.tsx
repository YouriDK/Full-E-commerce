import { FC } from 'react';
import { PacmanLoader } from 'react-spinners';
import { CSS } from '../data';
const EmptyCard: FC<any> = (): JSX.Element => {
  return <PacmanLoader color='#2ec4b6' loading css={CSS} size={50} />;
};
export default EmptyCard;
