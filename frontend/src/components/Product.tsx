import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ProductProps, texte } from '../data';
import Rating from './Rating';
interface Props {
  key?: string;
  product: ProductProps;
}
const Product: FC<Props> = ({ product }: Props): JSX.Element => {
  return (
    <div className='container page-wrapper'>
      <div className='page-inner'>
        <div className='row'>
          <div className='el-wrapper'>
            <Link to={'/product/' + product._id}>
              <div className='box-up'>
                <img
                  className='medium img'
                  src={product.image}
                  alt={product.name}
                />
                <div className='img-info'>
                  <div className='info-inner'>
                    <span className='p-name font-primary xlarge bold'>
                      {product.name}
                    </span>
                    <span className='p-company font-secondary'>
                      {product.brand}
                    </span>
                  </div>
                  <div className='a-size font-primary large bold'>
                    {product.numReviews} {texte.Terms.reviews.en}
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    ></Rating>
                  </div>
                </div>
              </div>
            </Link>
            <div className='box-down'>
              <div className='h-bg'>
                <div className='h-bg-inner'></div>
              </div>

              <a
                className='cart'
                href={'/cart?id=' + product._id + '&quantity=' + 1}
              >
                <span className='price'>{product.price}</span>
                <span className='add-to-cart'>
                  <span className='txt font-secondary large'>
                    {texte.Panier.add.en}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
