import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, useHistory } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import { Categories, texte } from './data';
import CartScreen from './Pages/CartScreen';
import HomeScreen from './Pages/HomeScreen';
import OrderHistoryScreen from './Pages/OrderHistoryScreen';
import OrderListScreen from './Pages/OrderListScreen';
import OrderScreen from './Pages/OrderScreen';
import PaymentScreen from './Pages/PaymentScreen';
import PlaceOrderScreen from './Pages/PlaceOrderScreen';
import ProductScreen from './Pages/ProductScreen';
import ProductsScreen from './Pages/ProductsScreen';
import ProfileScreen from './Pages/ProfileScreen';
import RegisterScreen from './Pages/RegisterScreen';
import ShippingScreen from './Pages/ShippingScreen';
import SignInScreen from './Pages/SignInScreen';
import UserListScreen from './Pages/UserListScreen';
import { switchCategoyProduct } from './redux/actions/productActions';
import { signout } from './redux/actions/userActions';

const App: FC<any> = (props: any): JSX.Element => {
  const cart = useSelector((state: any) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const history = useHistory();
  const [categories, setCategories] = useState('All');

  const moveTo: any = (moveTo: string) => {
    history.push(moveTo);
  };
  const handleCategories: any = (handleCat: string) => {
    dispatch(switchCategoyProduct(handleCat));
    setCategories(handleCat);
  };
  const signoutHandler = () => {
    dispatch(signout());
    moveTo('/#signout');
  };
  return (
    <>
      {/* <link
        rel='stylesheet'
        href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
      ></link> */}
      <div className='grid-container'>
        <header className='row'>
          <div>
            <Link className='brand' to='/'>
              {texte.Terms.site}
            </Link>
          </div>
          <div>
            <Link to='/cart'>
              <span className='font-secondary xlarge'>
                {texte.Cart.cart.en}
              </span>
              {cartItems.length > 0 && (
                <span className='badge'>{cartItems.length}</span>
              )}
            </Link>
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
          </div>
        </header>

        <main>
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/cart' exact={true} component={CartScreen} />
          <Route path='/products' component={ProductsScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/product/:id' component={ProductScreen} />

          <Route path='/signin' component={SignInScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/orderhistory' component={OrderHistoryScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <PrivateRoute path='/profile' component={ProfileScreen} />
          <AdminRoute
            path='/orderlist'
            component={OrderListScreen}
          ></AdminRoute>
          <AdminRoute path='/userlist' component={UserListScreen}></AdminRoute>

          <Route path='/' exact={true} component={HomeScreen} />
        </main>
        <footer className='row center font-footer'>
          Shop X Production YC Developpment
        </footer>
      </div>
    </>
  );
};
export default App;
