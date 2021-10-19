import React, { useEffect, FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';
import Rating from '../components/Rating';
import '../css/productPage.css';
import { texte } from '../data';
const ProductScreen: FC<any> = (props: any): JSX.Element => {
  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state: any) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      // * Return nothing
    };
  }, []);
  const handleAddtoCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant='danger' text={error} />
  ) : (
    <div className='card'>
      <Link to='/'>
        <div className='card__title icon'>
          <i className='fa fa-arrow-left'></i>
          <h3>{texte.Terms.back.en}</h3>
        </div>
      </Link>
      <div className='card__body'>
        <div className='half'>
          <div className='image'>
            <img className='large img' src={product.image} alt={product.name} />
          </div>
        </div>
        <div className='half flex columns around'>
          <div className='featured_text'>
            <h1>{product.brand}</h1>
            <p className='sub'>{product.name}</p>
            <p className='price'>${product.price}</p>
          </div>
          <div className='description'>
            <p>{product.description}</p>
          </div>
          {product.countInStock > 0 ? (
            <div className='row'>
              <span className='stock'>
                <i className='fa fa-pen'></i> {texte.Stock.in_stock.en}
              </span>
              <div className='font-list'>
                <select
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value as any);
                  }}
                >
                  {[...(Array(product.countInStock).keys() as any)].map((x) => (
                    <option key={x} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <span className='no_stock'>{texte.Stock.no_stock.en}</span>
          )}
        </div>
      </div>
      <div className='card__footer'>
        <div className='recommend'>
          <div className='reviews '>
            <Rating
              rating={product.rating}
              numReviews={product.numReviews}
            ></Rating>
            <span>
              {product.numReviews} {texte.Terms.reviews.en}{' '}
            </span>
          </div>
        </div>
        <div className='action'>
          <button
            type='button'
            onClick={handleAddtoCart}
            disabled={product.countInStock === 0}
          >
            {texte.Panier.add.en}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductScreen;
