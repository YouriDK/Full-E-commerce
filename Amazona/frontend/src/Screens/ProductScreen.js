import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";

export default function ProductScreen(props) {
  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      /* *  return nothing*/
    };
  }, []);
  // ! If you don't put , [] at the end , he will start again over and over

  const handleAddtoCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row top">
          <div className="col-2">
            <img src={product.image} alt={product.name}></img>
          </div>
          <div className="col-1">
            <ul>
              <li>
                <h1> {product.name}</h1>
              </li>
              <li>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
              </li>
              <li>
                Price : <b>$</b>
                {product.price}
              </li>
              <li>Description :{product.description}</li>
            </ul>
          </div>
          <div className="col-1">
            <div className="card card-body">
              <ul>
                <li>
                  <div className="row">
                    <div>Prive</div>
                    <div className="price">${product.price}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Status</div>
                    <div>
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
                      <div>Qty : </div>
                      <div>
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
