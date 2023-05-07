import { FC, useEffect, useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';
import { googleLogin } from '../redux/actions/userActions';
import { AppDispatch } from '../redux/store';
import { sleep } from '../utils';

const SignInScreen: FC<any> = (): JSX.Element => {
  const [fail, setFail] = useState<any>();
  const letsGoTo = useNavigate();
  const location = useLocation();
  // * Permet d'aller chercher les informations dans store avec le bon reducer
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  // * Rediriger après un checkout
  const redirect = location.search ? `/${location.search.split('=')[1]}` : '/';

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      letsGoTo(redirect);
    }
  }, [letsGoTo, redirect, userInfo]);

  const submitHandler = (e: any) => {
    e.preventDefault();
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
    <MessageBox variant='danger' error={error} />
  ) : (
    <div>
      <form
        className='form'
        onSubmit={submitHandler}
        style={{ float: 'right' }}
      >
        {fail ? (
          <MessageBox variant='danger' text={fail} />
        ) : (
          <div>
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
            >
              <GoogleLogin
                onSuccess={successGoogleLogin}
                onError={() => failGoogleLogin}
                type='standard'
                logo_alignment='center'
                theme='outline'
                size='large'
                width='100%'
              ></GoogleLogin>
            </GoogleOAuthProvider>
          </div>
        )}
      </form>
    </div>
  );
};
export default SignInScreen;
