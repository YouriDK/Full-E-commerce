import { FC, useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MesssageBox';
import Rating from '../components/Rating';
import '../css/productPage.css';
import { secondColor, texte } from '../data';
import { detailsProduct } from '../redux/actions/productActions';
import { AppDispatch } from '../redux/store';
const ProductScreen: FC<any> = (): JSX.Element => {
  const [quantity, setquantity] = useState(1);
  const params = useParams();
  const letsGoTo = useNavigate();
  const productDetails = useSelector((state: any) => state.productDetails);
  const isMobile = useSelector((state: any) => state.isMobile.isMobile);
  const { product, loading, error } = productDetails;
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (params.ProductId) {
      dispatch(detailsProduct(params.ProductId));
    }
  }, [dispatch, params]);
  const handleAddtoCart = () => {
    letsGoTo(`/cart?ProductId=${params.ProductId}&quantity=${quantity}`);
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger' error={error} />
  ) : (
    <div className='card' style={{ marginTop: '50px' }}>
      <Link to='/' className='link'>
        <div className='card__title icon'>
          <BsFillArrowLeftCircleFill size={20} className='primary' />
          <h3 className='font-button'>{texte.Terms.back.en}</h3>
        </div>
      </Link>
      <div
        className='card__body'
        style={{
          display: isMobile ? 'flex' : '',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <div className='half'>
          <div className='image'>
            <img
              className={`${isMobile ? 'mobile-product' : 'large'} img`}
              src={product.image}
              alt={product.name}
            />
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
                {' '}
                {texte.Stock.in_stock.en}{' '}
                <AiOutlineCheck size={25} color={secondColor} />
              </span>
              <div>
                <select
                  value={quantity}
                  onChange={(e) => {
                    setquantity(e.target.value as any);
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
      <div
        className='card__footer'
        style={{
          display: isMobile ? 'flex' : '',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <div className='recommend'>
          <div className='reviews'>
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
