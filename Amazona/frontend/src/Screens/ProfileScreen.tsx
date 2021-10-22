import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import CustomInput from '../components/CustomInput';

const ProfileScreen: FC<any> = (): JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state: any) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector(
    (state: any) => state.updateUserProfile
  );
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e: any) => {
    e.preventDefault();
    // TODO dispatch update profile
    if (password !== confirmPassword) {
      alert('Password and Confirm Password are not matched');
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, password }));
    }
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger' text={error} />
  ) : (
    <form className='form' onSubmit={submitHandler}>
      <div>
        {' '}
        <h1 className='text-center font-primary xlarge xbold'>
          {' '}
          User Profile{' '}
        </h1>
      </div>
      {loadingUpdate && <LoadingBox></LoadingBox>}
      {errorUpdate && <MessageBox variant='danger' text={errorUpdate} />}
      {successUpdate && (
        <MessageBox variant='success' text=' Profile updated successfully' />
      )}
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
        type='email'
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
        label='Confirm Password'
        type='password'
        change={setConfirmPassword}
      />
      <div>
        <button
          className='primary block font-secondary large xbold'
          type='submit'
        >
          UPDATE{' '}
        </button>
      </div>{' '}
    </form>
  );
};
export default ProfileScreen;
