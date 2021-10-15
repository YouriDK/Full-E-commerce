import { FC } from 'react';
import { Alert } from 'reactstrap';
interface MesssageBoxProps {
  text: string[] | string;
  variant: string;
}
const MesssageBox: FC<MesssageBoxProps> = ({
  text,
  variant,
}: MesssageBoxProps): JSX.Element => {
  console.log(text[0]);
  return (
    <Alert color={variant} className={`center alert`}>
      {text[0]}
    </Alert>
  );
};
export default MesssageBox;
