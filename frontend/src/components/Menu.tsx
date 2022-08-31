import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { texte, Categories } from '../data';
import { switchCategoyProduct } from '../redux/actions/productActions';
import { signout } from '../redux/actions/userActions';

const Menu: FC<any> = (): JSX.Element => {
  const cart = useSelector((state: any) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const history = useHistory();
  const moveTo: any = (moveTo: string) => {
    history.push(moveTo);
  };
  const userSignin = useSelector((state: any) => state.userSignin);
  const [categories, setCategories] = useState('All');
  const { userInfo } = userSignin;
  const handleCategories: any = (handleCat: string) => {
    dispatch(switchCategoyProduct(handleCat));
    setCategories(handleCat);
  };
  const signoutHandler = () => {
    dispatch(signout());
    moveTo('/#signout');
  };
  return (
    <header className='row'>
      <div id='brand-box'>
        <Link className='brand' to='/'>
          {texte.Terms.site}
        </Link>
      </div>
      <div>
        {history.location.pathname === '/' && (
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
        )}
        {'  '}

        {userInfo && userInfo.admin && (
          <div className='dropdown font-secondary xlarge'>
            <Link to='#admin'>
              {' '}
              Admin
              <i className='fa fa-caret-down'></i>
            </Link>

            <ul className='dropdown-content'>
              {' '}
              <li>
                <Link to='/dashboard' className='font-secondary large'>
                  {' '}
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to='/orderlist' className='font-secondary large'>
                  {' '}
                  Orders
                </Link>
              </li>
              <li>
                <Link to='/products' className='font-secondary large'>
                  Products
                </Link>
              </li>
              <li>
                <Link to='/userlist' className='font-secondary large'>
                  {' '}
                  Users
                </Link>
              </li>
            </ul>
          </div>
        )}
        <Link to='/cart'>
          <span className='font-secondary xlarge'>{texte.Cart.cart.en}</span>
          {cartItems.length > 0 && (
            <span className='badge'>{cartItems.length}</span>
          )}
        </Link>
        {userInfo ? (
          <div className='dropdown'>
            <Link to='#' className='font-secondary xlarge'>
              {userInfo.family_name ? userInfo.family_name : userInfo.name}{' '}
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
