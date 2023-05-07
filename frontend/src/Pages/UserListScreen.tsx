import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../redux/actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MesssageBox from '../components/MesssageBox';
import { texte } from '../data';
import { BsCheckLg } from 'react-icons/bs';
import { GiCancel } from 'react-icons/gi';
import { AppDispatch } from '../redux/store';

const UserListScreen: FC<any> = (): JSX.Element => {
  const userList = useSelector((state: any) => state.userList);
  const { loading, error, users } = userList;
  const dispatch: AppDispatch = useDispatch();
  const isMobile = useSelector((state: any) => state.isMobile.isMobile);
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MesssageBox variant='danger' error={error} />
  ) : (
    <div
      className='table-users'
      style={{ width: '80%', overflowX: isMobile ? 'visible' : 'hidden' }}
    >
      <div className='header'>Users</div>
      <table
        className='table'
        style={{ overflowX: isMobile ? 'visible' : 'hidden' }}
      >
        <tr className='table-tr'>
          {texte.Users.userList.en.map((td: string) => (
            <td className='table-td  table-title' key={td}>
              {td}
            </td>
          ))}
        </tr>
        {users.map((user: any) => (
          <tr
            className='table-tr'
            key={user._id}
            style={{ overflowX: isMobile ? 'visible' : 'hidden' }}
          >
            <td className='table-td font-secondary large xbold'>
              {user.admin ? (
                <BsCheckLg color='#15ff00' />
              ) : (
                <GiCancel color='#ff0054' />
              )}
            </td>
            <td className='table-td font-secondary large xbold'>{user.name}</td>
            <td className='table-td font-secondary large xbold'>
              {user.email}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
export default UserListScreen;
