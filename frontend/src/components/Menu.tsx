import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { FC, useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdManageAccounts } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Categories, texte } from '../data';
import { switchCategoyProduct } from '../redux/actions/productActions';
import { googleLogin, signout } from '../redux/actions/userActions';
import { AppDispatch } from '../redux/store';
import { sleep } from '../utils';
import MesssageBox from './MesssageBox';
interface MenuDataProps {
  to: string;
  className: string;
  title: string;
}
const Menu: FC<any> = (): JSX.Element => {
  const cart = useSelector((state: any) => state.cart);
  const isMobile = useSelector((state: any) => state.isMobile.isMobile);
  const { cartItems } = cart;
  const [fail, setFail] = useState<any>();
  const dispatch: AppDispatch = useDispatch();
  const letsGoTo = useNavigate();
  const moveTo: any = (url: string) => {
    letsGoTo(url);
  };

  const userSignin = useSelector((state: any) => state.userSignin);
  const [categories, setCategories] = useState('All');
  const { userInfo } = userSignin;
  const handleCategories: any = (handleCat: string) => {
    dispatch(switchCategoyProduct(handleCat));
    setCategories(handleCat);
  };
  const successGoogleLogin = (googleData: any) => {
    dispatch(googleLogin(googleData));
  };
  const failGoogleLogin = () => {
    setFail('Failed');
    sleep(2000);
    setFail(null);
  };

  const MenuData: MenuDataProps[] = [
    { to: '/dashboard', className: 'font-secondary large', title: 'Dashboard' },
    { to: '/orderlist', className: 'font-secondary large', title: 'Orders' },
    { to: '/products', className: 'font-secondary large', title: 'Products' },
    { to: '/userlist', className: 'font-secondary large', title: 'Users' },
  ];

  const signoutHandler = () => {
    dispatch(signout());
    moveTo('/#signout');
  };

  return (
    <header
      className='row'
      style={{
        display: isMobile ? 'flex' : '',
        justifyContent: isMobile ? 'space-between' : '',
        flexWrap: 'nowrap',
      }}
    >
      <div id='brand-box'>
        <Link className='brand' to='/'>
          {texte.Terms.site}
        </Link>
      </div>

      {!isMobile && (
        <div className='center font-footer' style={{ color: 'white' }}>
          Shop X Production YC Developpment
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: isMobile ? 'space-around' : '',
          flexWrap: 'nowrap',
        }}
      >
        <div className='dropdown' style={{ padding: '1rem' }}>
          <Link to='#' className='font-secondary xlarge'>
            {categories === 'All' ? 'Category' : categories}
          </Link>
          <ul className='dropdown-content'>
            {Categories.map((cat: string, index: number) => (
              <li key={index}>
                <Link
                  to='#'
                  className='font-secondary large'
                  onClick={() => handleCategories(cat)}
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {'  '}

        {userInfo && userInfo.admin && (
          <div
            className='dropdown font-secondary xlarge'
            style={{ padding: '1rem' }}
          >
            {isMobile ? (
              <Link to='#admin'>
                <MdManageAccounts size={25} style={{ margin: '1rem' }} />
              </Link>
            ) : (
              <Link to='#admin'>
                {' '}
                Management
                <i className='fa fa-caret-down'></i>
              </Link>
            )}

            <ul className='dropdown-content'>
              {MenuData.map((propsMenu: MenuDataProps, index: number) => (
                <li key={index}>
                  <Link to={propsMenu.to} className={propsMenu.className}>
                    {' '}
                    {propsMenu.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Link to='/cart'>
          {isMobile ? (
            <AiOutlineShoppingCart
              size={25}
              color={cartItems.length > 0 ? 'red' : 'white'}
              style={{ margin: '1rem' }}
            />
          ) : (
            <span className='font-secondary xlarge'>{texte.Cart.cart.en}</span>
          )}
          {cartItems.length > 0 && !isMobile && (
            <span className='badge'>{cartItems.length}</span>
          )}
        </Link>
        {userInfo ? (
          <div className='dropdown' style={{ padding: '1rem' }}>
            <Link to='#' className='font-secondary xlarge'>
              {userInfo.given_name ? userInfo.given_name : userInfo.name}{' '}
            </Link>
            <ul className='dropdown-content'>
              {!userInfo.family_name && (
                <li>
                  <Link to='/profile' className='font-secondary large'>
                    {' '}
                    {texte.Terms.user.en}
                  </Link>
                </li>
              )}
              <li>
                <Link to='/orderhistory' className='font-secondary large '>
                  {texte.Ordre.history.en}
                </Link>
              </li>

              <li>
                <Link
                  to='/#signout'
                  className='font-secondary large'
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        ) : fail ? (
          <MesssageBox variant='danger' text={fail} />
        ) : (
          <div style={{ padding: '1.5rem 1rem' }}>
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
            >
              <GoogleLogin
                onSuccess={successGoogleLogin}
                onError={() => failGoogleLogin}
                type={isMobile ? 'icon' : 'standard'}
                logo_alignment='center'
                theme='outline'
                size='medium'
                width='50%'
                text='signin_with'
              ></GoogleLogin>
            </GoogleOAuthProvider>
          </div>
        )}
      </div>
    </header>
  );
};
export default Menu;
