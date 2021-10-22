import React from "react";
import HomeScreen from "../src/Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import { BrowserRouter, Route, Link } from "react-router-dom";
import CartScreen from "./Screens/CartScreen";
import SignInScreen from "./Screens/SignInScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProductsScreen from "./Screens/ProductsScreen";
import { useDispatch, useSelector } from "react-redux";
import ShippingScreen from "./Screens/ShippingScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import { signout } from "./actions/userActions";
import OrderScreen from "./Screens/OrderScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import OrderListScreen from "./Screens/OrderListScreen";
/*  
TODO  : Vérifier qu'on peut faire plusieurs compte
TODO  : Trouver le soucis de useState
*/

function App() {
  // * On récupère les infos user dans le Cookies
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  /*
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };*/
  const signoutHandler = () => {
    dispatch(signout());
  };
  // * la link stylesheet permet d'afficher les étoiles
  return (
    <BrowserRouter>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              {" "}
              E-Shop
            </Link>
          </div>
          <div>
            <Link to="/cart/:id?">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {"  "}
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>

                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="signin">Sign In</Link>
            )}
            {userInfo && userInfo.admin && (
              <div className="dropdown">
                <Link to="#admin">
                  {" "}
                  Admin <i className="fa fa-caret-down"></i>
                </Link>

                <ul className="dropdown-content">
                  {" "}
                  <li>
                    <Link className="/dashboard"> Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/orderlist"> Orders</Link>
                  </li>
                  <li>
                    <Link to="/products">Products</Link>
                  </li>
                  <li>
                    <Link className="/userlist"> Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        <main>
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/products" component={ProductsScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" exact={true} component={CartScreen} />
          <Route path="/signin" component={SignInScreen} />
          <Route path="/register" component={RegisterScreen} />

          <Route path="/order/:id" component={OrderScreen} />
          <PrivateRoute path="/profile" component={ProfileScreen} />
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
          ></AdminRoute>

          <Route path="/" exact={true} component={HomeScreen} />
        </main>
        <footer className="row center">All right Reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

// * Le ? après id montre que c'est optionnel et ça va fonctionner même si il n'y en a pas
