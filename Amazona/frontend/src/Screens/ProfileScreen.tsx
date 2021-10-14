import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const ProfileScreen: FC<any> = (props: any): JSX.Element => {
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
  return (
    <div>
      {' '}
      <form className='form' onSubmit={submitHandler}>
        <div>
          {' '}
          <h1 className='font-list text-center'> User Profile </h1>
        </div>

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant='danger'>{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant='success'>
                Profile updated successfully
              </MessageBox>
            )}
            <div>
              <label htmlFor='name'>Name</label>
              <input
                id='name'
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                type='text'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                id='password'
                type='password'
                placeholder='Enter password'
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input
                id='confirmPassword'
                type='password'
                placeholder='Enter confirm password'
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label />
              <button className='primary' type='submit'>
                Update{' '}
              </button>
            </div>{' '}
          </>
        )}
      </form>
    </div>
  );
};
export default ProfileScreen;
