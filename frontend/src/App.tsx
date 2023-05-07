import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';

import CartScreen from './Pages/CartScreen';
import HomeScreen from './Pages/HomeScreen';
import OrderHistoryScreen from './Pages/OrderHistoryScreen';
import OrderListScreen from './Pages/OrderListScreen';
import OrderScreen from './Pages/OrderScreen';
import PaymentScreen from './Pages/PaymentScreen';
import PlaceOrderScreen from './Pages/PlaceOrderScreen';
import ProductScreen from './Pages/ProductScreen';
import ProductsScreen from './Pages/ProductsScreen';

import ShippingScreen from './Pages/ShippingScreen';
import SignInScreen from './Pages/SignInScreen';
import UserListScreen from './Pages/UserListScreen';
import { setMobileView } from './redux/actions/userActions';
import { AppDispatch } from './redux/store';

const App: FC<any> = (): JSX.Element => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    setIsMobile(window.innerWidth < 769);
    dispatch(setMobileView(window.innerWidth < 769));
  }, [dispatch, window.innerWidth]);
  return (
    <>
      <div className='grid-container'>
        <Menu />
        <main>
          <Routes>
            <Route path='/payment' Component={PaymentScreen} />
            <Route path='/placeorder' Component={PlaceOrderScreen} />
            <Route path='/cart' Component={CartScreen} />
            <Route path='/products' Component={ProductsScreen} />
            <Route path='/shipping' Component={ShippingScreen} />
            <Route path='/product/:ProductId' Component={ProductScreen} />
            <Route path='/signin' Component={SignInScreen} />
            <Route path='/orderhistory' Component={OrderHistoryScreen} />
            <Route path='/order/:OrderId' Component={OrderScreen} />
            <Route
              path='/orderlist'
              element={
                userInfo && userInfo.admin ? (
                  <OrderListScreen />
                ) : (
                  <Navigate to='/signin' />
                )
              }
            >
              {' '}
            </Route>
            <Route
              path='/userlist'
              element={
                userInfo && userInfo.admin ? (
                  <UserListScreen />
                ) : (
                  <Navigate to='/signin' />
                )
              }
            >
              {' '}
            </Route>

            <Route path='/' Component={HomeScreen} />
          </Routes>
        </main>
      </div>
    </>
  );
};
export default App;
