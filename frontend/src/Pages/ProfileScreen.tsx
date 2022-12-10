import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../components/CustomInput';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';
import { detailsUser } from '../redux/actions/userActions';
import { USER_UPDATE_RESET } from '../redux/constants/userConstants';

const ProfileScreen: FC<any> = (): JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
      console.log('user', user);
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger' error={error} />
  ) : (
    <form className='form'>
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
        disabled
      />
      <CustomInput
        variable={email}
        name='email'
        label='Email'
        type='email'
        change={setEmail}
        disabled
      />
      <div></div>{' '}
    </form>
  );
};
export default ProfileScreen;
