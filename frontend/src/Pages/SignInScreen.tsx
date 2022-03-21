import React, { useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';
import { googleLogin, signin } from '../redux/actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';
import CustomInput from '../components/CustomInput';
import { Button } from 'reactstrap';
import { texte } from '../data';
import { sleep } from '../utils';

const SignInScreen: FC<any> = (props: any): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    dispatch(signin(email, password));
  };

  const successGoogleLogin = (googleData: any) => {
    dispatch(googleLogin(googleData));
  };
  const failGoogleLogin = (error: any) => {
    setFail('Failed');
    sleep(2000);
    setFail(null);
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger' text={error} />
  ) : (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1 className='text-center font-title'>Sign-In</h1>
        </div>
        <CustomInput
          variable={email}
          name='email'
          label='Email'
          type='email'
          change={setEmail}
          placeholder='Enter email'
        />
        <CustomInput
          variable={password}
          name='password'
          label='Password'
          type='password'
          change={setPassword}
          placeholder='Enter password'
        />
        <br />
        <div>
          <Button type='submit' className='primary'>
            {texte.Terms.sign.en}
          </Button>
        </div>

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
        <div>
          <span style={{ textAlign: 'center' }}>
            You don't have you account ?
          </span>
        </div>

        <div>
          <Button className='secondary'>
            <Link
              className='link'
              to={
                redirect === '/' ? 'register' : 'register?redirect=' + redirect
              }
            >
              Create your account
            </Link>
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInScreen;
