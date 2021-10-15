import { FC } from 'react';
import { Alert } from 'reactstrap';
const MesssageBox: FC<any> = (text: string, variant: string): JSX.Element => {
  return (
    <Alert color={variant} className={`center alert`}>
      {text[0]}
    </Alert>
  );
};
export default MesssageBox;
