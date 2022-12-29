import { FC } from 'react';
import { Route } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
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

const App: FC<any> = (props: any): JSX.Element => {
  return (
    <>
      <div className='grid-container'>
        <Menu />
        <main>
          <div>
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/cart' exact={true} component={CartScreen} />
            <Route path='/products' component={ProductsScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/signin' component={SignInScreen} />
            <Route path='/orderhistory' component={OrderHistoryScreen} />
            <Route path='/order/:id' component={OrderScreen} />
            <AdminRoute
              path='/orderlist'
              component={OrderListScreen}
            ></AdminRoute>
            <AdminRoute
              path='/userlist'
              component={UserListScreen}
            ></AdminRoute>

            <Route path='/' exact={true} component={HomeScreen} />
          </div>
        </main>
      </div>
    </>
  );
};
export default App;
