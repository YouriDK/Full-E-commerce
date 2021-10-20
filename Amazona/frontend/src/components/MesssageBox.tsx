import { FC } from 'react';
import { Alert } from 'reactstrap';
interface MesssageBoxProps {
  text: string[] | string;
  variant: string;
  notext?: boolean;
}
const MesssageBox: FC<MesssageBoxProps> = ({
  text,
  variant,
  notext,
}: MesssageBoxProps): JSX.Element => {
  console.log(text[0]);
  console.log(text);
  return (
    <Alert
      color={variant}
      className={`center alert`}
      style={{ margin: 'auto' }}
    >
      {notext ? text[0] : text}
    </Alert>
  );
};
export default MesssageBox;
