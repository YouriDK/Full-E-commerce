import React, { FC, useEffect, useState } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../Redux/actions/productActions';
import Product from '../components/Product';
import { ProductProps } from '../data';
import { Pagination } from '@mui/material';

const HomeScreen: FC<any> = (): JSX.Element => {
  const productList = useSelector((state: any) => state.productList);
  const [currentCage, setCurrentCage] = useState(1);
  const { products, loading, error } = productList;
  const ITEMS_MAX = 13;
  const dispatch = useDispatch();
  const handlePage = (e: any, value: number) => {
    setCurrentCage(value);
  };
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger' text={error} />
  ) : (
    <>
      <div className='row center'>
        {products
          .slice((currentCage - 1) * ITEMS_MAX, currentCage * ITEMS_MAX - 1)
          .map((product: ProductProps) => {
            return <Product key={product._id} product={product} />;
          })}
      </div>
      <br />
      <Pagination
        size='large'
        // shape='rounded'
        count={
          products.length % ITEMS_MAX !== 0
            ? products.length / ITEMS_MAX + 1
            : products.length / ITEMS_MAX
        }
        page={currentCage}
        defaultPage={1}
        className='pagination'
        color='primary'
        boundaryCount={2}
        onChange={handlePage}
      />
    </>
  );
};
export default HomeScreen;
