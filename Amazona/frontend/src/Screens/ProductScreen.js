import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";

/* 
*fait Arranger le lien back to result et le mettre dans un bouton
*fait Mettre back to resulte dans un vrai bouton
TODO Mettre une ombre dans la présentation du produit ou chercher un template cart
*/
export default function ProductScreen(props) {
  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      // * Return nothing
    };
  }, []); // ! If you don't put , [] at the end , he will start again over and over

  const handleAddtoCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  return (
    <div>
      <button className="back-to-result">
        <Link to="/">
          <i className="fa fa-caret-left"></i> Back to result
        </Link>
      </button>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row top">
          <div className="col-2 center">
            <img
              className="medium"
              src={product.image}
              alt={product.name}
            ></img>
          </div>
          <div className="col-1 card ">
            <ul>
              <li>
                <h1 className="font-list"> {product.name}</h1>
              </li>

              <li>
                <strong>Price :</strong> <b className="font-list">$</b>
                <span className="font-list">{product.price}</span>
              </li>
              <li>
                <strong>Description :</strong>{" "}
                <span>{product.description}</span>
              </li>
              <li>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
              </li>
            </ul>
          </div>
          <div className="col-1">
            <div className="card card-body">
              <ul>
                <li>
                  <div className="row">
                    <strong>Price</strong>
                    <div className="price font-list">${product.price}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <strong>Status</strong>
                    <div className="font-list">
                      {product.countInStock > 0 ? (
                        <span className="success">In Stock</span>
                      ) : (
                        <span className="danger">Unavailable</span>
                      )}
                    </div>
                  </div>
                </li>
                {product.countInStock > 0 && (
                  <li>
                    <div className="row">
                      <strong>Quantity : </strong>
                      <div className="font-list">
                        <select
                          value={qty}
                          onChange={(e) => {
                            setQty(e.target.value);
                          }}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </li>
                )}
                <li>
                  {product.countInStock > 0 && (
                    <button onClick={handleAddtoCart} className="primary block">
                      Add to Cart
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
