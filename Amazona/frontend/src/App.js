import React from "react";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter, Route, Link } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SignInScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import { useSelector } from "react-redux";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
/*  
TODO  : Faire la déconnection
TODO  : Vérifier qu'on peut faire plusieurs compte
TODO  : Trouver le soucis de useState
*/

function App() {
  // * On récupère les infos user dans le Cookies

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/"> Amazona</Link>
          </div>
          <div className="header-links">
            <a href="cart.html">Cart</a>{" "}
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="signin">Sign In</Link>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <a href="index.html">Pants </a>
            </li>
            <li>
              <a href="index.html">Shirts </a>
            </li>
          </ul>
        </aside>

        <main className="main">
          <div className="content">
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" exact={true} component={CartScreen} />
            <Route path="/signin" component={SignInScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">All right Reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

// * Le ? après id montre que c'est optionnel et ça va fonctionner même si il n'y en a pas
