import { FC } from 'react';
import { Alert } from 'reactstrap';
interface ErrorProps {
  response: string;
  status: number;
  type: string;
  title: string;
}

interface MesssageBoxProps {
  text?: string[] | string;
  variant: string;
  notext?: boolean;
  error?: any;
}
const MesssageBox: FC<MesssageBoxProps> = ({
  text = '',
  variant,
  notext,
  error,
}: MesssageBoxProps): JSX.Element => {
  const mistake: ErrorProps = error?.response?.data ?? {
    title: '',
    status: '',
    type: 0,
    response: '',
  };
  return error ? (
    <Alert
      color={variant}
      className={`center alert `}
      style={{ margin: 'auto', marginTop: '50px' }}
    >
      {`${mistake.title} ${mistake.status} : ${mistake.response} from ${mistake.type} !`}
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
