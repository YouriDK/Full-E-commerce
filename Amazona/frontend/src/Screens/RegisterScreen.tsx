import React, { useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';
import CustomInput from '../components/CustomInput';
import { Button } from 'reactstrap';
import { texte } from '../data';

const RegisterScreen: FC<any> = (props: any): JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const userRegister = useSelector((state: any) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/'; // * Redirgier après un checkout

  const dispatch = useDispatch();
  // ! If you don't put , [] at the end , he will start again over and over
  const submitHandler = (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Put the same password and confirmation please !');
    } else {
      dispatch(register(name, email, password));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger' text={error} />
  ) : (
    <div>
      <form className='form' onSubmit={submitHandler}>
        <div>
          <h1 style={{ textAlign: 'center' }}>Create an account</h1>
        </div>
        <CustomInput
          variable={name}
          name='name'
          label='Name'
          type='text'
          change={setName}
        />
        <CustomInput
          variable={email}
          name='email'
          label='Email'
          type='text'
          change={setEmail}
        />
        <CustomInput
          variable={password}
          name='password'
          label='Password'
          type='password'
          change={setPassword}
        />
        <CustomInput
          variable={confirmPassword}
          name='confirmPassword'
          label='Re-Enter Password'
          type='password'
          change={setConfirmPassword}
        />

        <div>
          <Button type='submit' className='primary'>
            Register{' '}
          </Button>
        </div>
        <div>
          <span style={{ textAlign: 'center' }}>Already signed ?</span>
        </div>
        <div>
          <Button>
            <Link
              to={redirect === '/' ? 'signin' : 'signin?redirect=' + redirect}
              className='button secondary text-center font-secondary xlarge xbold'
            >
              {texte.Terms.sign.en}
            </Link>
          </Button>
        </div>
      </form>
    </div>
  );
};
export default RegisterScreen;
