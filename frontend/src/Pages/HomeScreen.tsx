import React, { FC, useEffect, useState } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productActions';
import Product from '../components/Product';
import { ProductProps } from '../data';
import { Pagination } from '@mui/material';
import { AppDispatch } from '../redux/store';

const HomeScreen: FC<any> = (): JSX.Element => {
  const productList = useSelector((state: any) => state.productList);
  const isMobile = useSelector((state: any) => state.isMobile.isMobile);
  const category = useSelector((state: any) => state.category);
  const [currentCage, setCurrentCage] = useState(1);
  const { products, loading, error } = productList;
  const ITEMS_MAX = isMobile ? 5 : 13;
  const dispatch: AppDispatch = useDispatch();
  const handlePage = (e: any, value: number) => {
    setCurrentCage(value);
  };
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger' error={error} />
  ) : (
    <>
      <div className='row center'>
        {products
          .filter(
            (product: ProductProps) =>
              product.category === category || category === 'All'
          )
          .slice((currentCage - 1) * ITEMS_MAX, currentCage * ITEMS_MAX - 1)
          .map((product: ProductProps) => {
            return <Product key={product._id} product={product} />;
          })}
      </div>
      <br />
      <Pagination
        size='large'
        // shape='rounded'
        count={parseInt(
          (products.length % ITEMS_MAX !== 0
            ? products.length / ITEMS_MAX + 1
            : products.length / ITEMS_MAX
          ).toString()
        )}
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