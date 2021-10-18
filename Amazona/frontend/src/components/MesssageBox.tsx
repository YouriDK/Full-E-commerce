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
  console.log(text);
  return (
    <Alert
      color={variant}
      className={`center alert`}
      style={{ margin: 'auto' }}
    >
      {text[0]}
    </Alert>
  );
};
export default MesssageBox;
