import React, { useEffect } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Product from "../components/Product";

export default function HomeScreen() {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="row center">
      {products.map((product) => {
        return <Product key={product._id} product={product} />;
      })}
    </div>
  );
}
