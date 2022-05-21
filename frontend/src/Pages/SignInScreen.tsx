import React, { FC, useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';
import { googleLogin } from '../redux/actions/userActions';
import { sleep } from '../utils';

const SignInScreen: FC<any> = (props: any): JSX.Element => {
  const [fail, setFail] = useState<any>();

  // * Permet d'aller chercher les informations dans store avec le bon reducer
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  // * Rediriger après un checkout
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  const submitHandler = (e: any) => {
    e.preventDefault();
  };

  const successGoogleLogin = (googleData: any) => {
    dispatch(googleLogin(googleData));
  };
  const failGoogleLogin = (error: any) => {
    console.log('FEILLE 6>', error);
    setFail('Failed');
    sleep(2000);
    setFail(null);
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger' error={error} />
  ) : (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        {fail ? (
          <MessageBox variant='danger' text={fail} />
        ) : (
          <div>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  style={{ textAlign: 'center', alignItems: 'middle' }}
                  className='primary'
                  disabled={renderProps.disabled}
                >
                  Log in with Google
                </Button>
              )}
              buttonText='Log in with Google'
              onSuccess={successGoogleLogin}
              onFailure={failGoogleLogin}
              cookiePolicy={'single_host_origin'}
            ></GoogleLogin>
          </div>
        )}
      </form>
    </div>
  );
};
export default SignInScreen;
