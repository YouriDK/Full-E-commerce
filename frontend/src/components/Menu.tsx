import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Categories, texte } from '../data';
import { switchCategoyProduct } from '../redux/actions/productActions';
import { signout } from '../redux/actions/userActions';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import { MdManageAccounts } from 'react-icons/md';
import { AppDispatch } from '../redux/store';
interface MenuDataProps {
  to: string;
  className: string;
  title: string;
}
const Menu: FC<any> = (): JSX.Element => {
  const cart = useSelector((state: any) => state.cart);
  const isMobile = useSelector((state: any) => state.isMobile.isMobile);
  const { cartItems } = cart;
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
        justifyContent: isMobile ? 'space-around' : '',
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
          display: isMobile ? 'flex' : '',
          justifyContent: isMobile ? 'space-around' : '',
          flexWrap: 'nowrap',
        }}
      >
        <div className='dropdown'>
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
          <div className='dropdown font-secondary xlarge'>
            {isMobile ? (
              <Link to='#admin'>
                <MdManageAccounts size={25} />
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
            />
          ) : (
            <span className='font-secondary xlarge'>{texte.Cart.cart.en}</span>
          )}
          {cartItems.length > 0 && !isMobile && (
            <span className='badge'>{cartItems.length}</span>
          )}
        </Link>
        {userInfo ? (
          <div className='dropdown'>
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
        ) : (
          <Link to='/signin' className='font-secondary xlarge'>
            {' '}
            {texte.Terms.sign.en}
          </Link>
        )}
      </div>
    </header>
  );
};
export default Menu;
