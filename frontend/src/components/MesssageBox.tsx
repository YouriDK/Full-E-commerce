import { FC } from 'react';
import { Alert } from 'reactstrap';
interface ErrorProps {
  detail: string;
  status: number;
  type: string;
  title: string;
}

interface MesssageBoxProps {
  text?: string[] | string;
  variant: string;
  notext?: boolean;
  error?: ErrorProps;
}
const MesssageBox: FC<MesssageBoxProps> = ({
  text = '',
  variant,
  notext,
  error,
}: MesssageBoxProps): JSX.Element => {
  return error ? (
    <Alert
      color={variant}
      className={`center alert `}
      style={{ margin: 'auto' }}
    >
      {`${error.title} ${error.status} : ${error.detail} from ${error.type} !`}
    </Alert>
  ) : (
    <Alert
      color={variant}
      className={`center alert `}
      style={{ margin: 'auto' }}
    >
      {notext ? text[0] : text}
    </Alert>
  );
};
export default MesssageBox;
