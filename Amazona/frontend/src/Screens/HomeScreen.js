import React, { useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Product from "../components/Product";

export default function HomeScreen() {
  /* *  using Hooks*/

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  console.log(localStorage);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
    return () => {
      /* *  return nothing*/
    };
  }, [dispatch]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <ul className="row center">
      {products.map((product) => {
        return <Product key={product._id} product={product} />;
      })}
    </ul>
  );
}
