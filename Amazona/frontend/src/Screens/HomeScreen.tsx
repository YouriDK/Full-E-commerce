import React, { FC, useEffect } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';

const HomeScreen: FC<any> = (): JSX.Element => {
  const productList = useSelector((state: any) => state.productList);
  const { products, loading, error } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger' text={error} />
  ) : (
    <div className='row center'>
      {products.map((product: any) => {
        return <Product key={product._id} product={product} />;
      })}
    </div>
  );
};
export default HomeScreen;
