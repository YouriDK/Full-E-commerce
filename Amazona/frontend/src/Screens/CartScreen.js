import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
/* // TODO Mettre une meilleur forme au dessus du bouton Checkout
  
  * Fait   Aligner bouton et compteur 
  * Fait   Agrandir le texte du nom du produit et le prix
  * Fait   Mettre une ombre ou quelque chose autour de la liste des produits
*/

export default function CartScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const productId = props.match.params.id;
  // * Permet de chercher la quantité dans le lien et de l'extraire
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const removeFromCardHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  return (
    <div className="row top">
      <div className="col-2">
        <h1 className="cart-title">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul className="card">
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row product-list">
                  <div>
                    <img src={item.image} alt={item.name} className="small" />
                  </div>
                  <div className="min-30 font-list">
                    <Link to={"/product/" + item.product}>{item.name}</Link>
                  </div>
                  <div className="flex">
                    <select
                      value={item.qty}
                      className="font-list"
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <div>
                      <button
                        type="button"
                        className="font-list"
                        onClick={() => removeFromCardHandler(item.product)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="font-list">${item.price}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items ) :
                ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
