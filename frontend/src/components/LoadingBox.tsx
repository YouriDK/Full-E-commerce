import { FC } from 'react';
import { ClimbingBoxLoader } from 'react-spinners';
import { CSS } from '../data';
const LoadingBox: FC<any> = (): JSX.Element => {
  return <ClimbingBoxLoader color='#2ec4b6' loading css={CSS} size={30} />;
};
export default LoadingBox;
