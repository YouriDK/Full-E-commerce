import React, { useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';

const SignInScreen: FC<any> = (props: any): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // * Permet d'aller chercher les informations dans store avec le bon reducer
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  // * Rediriger après un checkout
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const dispatch = useDispatch();

  // ! If you don't put , [] at the end , he will start again over and over
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  return (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1 className='text-center font-title'>Sign-In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant='danger' text={error} />}

        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Enter email'
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Enter password'
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <br />
        <div>
          <button type='submit' className='primary'>
            Sign-In{' '}
          </button>
        </div>
        <div className='text-center'>
          <strong>You don't have you account ?</strong>
        </div>

        <div>
          <button>
            <Link
              to={
                redirect === '/' ? 'register' : 'register?redirect=' + redirect
              }
            >
              Create your account
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};
export default SignInScreen;
