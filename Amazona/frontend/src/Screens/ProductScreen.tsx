import React, { useEffect, FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { detailsProduct } from '../redux/actions/productActions';
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
  }, [dispatch, props.match.params.id]);
  const handleAddtoCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger' text={error} />
  ) : (
    <div className='card'>
      <Link to='/' className='link'>
        <div className='card__title icon'>
          <i className='fa fa-arrow-left' color='#2c6e49'></i>
          <h3 className='font-button'>{texte.Terms.back.en}</h3>
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
            <h1 className='font-secondary '>{product.brand}</h1>
            <p className='sub font-primary'>{product.name}</p>
            <p className='price font-secondary bold'>${product.price}</p>
          </div>
          <div className='description font-secondary'>
            <p>{product.description}</p>
          </div>
          {product.countInStock > 0 ? (
            <div className='row'>
              <span className='stock large'>
                <i className='fa fa-pen'></i> {texte.Stock.in_stock.en}
              </span>
              <div>
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
            <span className='font-secondary xlarge bold'>
              {product.numReviews} {texte.Terms.reviews.en}{' '}
            </span>
          </div>
        </div>
        <div className='action'>
          <Button
            type='button'
            className='primary'
            onClick={handleAddtoCart}
            disabled={product.countInStock === 0}
          >
            {texte.Panier.add.en}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ProductScreen;
