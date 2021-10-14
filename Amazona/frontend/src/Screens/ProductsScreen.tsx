import React, { useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listProducts,
  saveProduct,
  deleteProduct,
} from '../actions/productActions';

const ProductsScreen: FC<any> = (props: any): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [rating, setRating] = useState('');
  const [numReviews, setNumReviews] = useState('');

  const productSave = useSelector((state: any) => state.productSave);
  const productDelete = useSelector((state: any) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const productList = useSelector((state: any) => state.productList);
  const { loading, products, error } = productList;
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successSave) setModalVisible(false);
    dispatch(listProducts());
    return () => {
      /* *  return nothing*/
    };
  }, [successSave, successDelete]);
  // ! If you don't put , [] at the end , he will start again over and over

  const openModal = (product: any) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
    setRating(product.rating);
    setNumReviews(product.numReviews);
  };
  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        image,
        brand,
        price,
        category,
        countInStock,
        description,
        rating,
        numReviews,
      })
    );
  };

  const deleteHandler = (product: any) => {
    dispatch(deleteProduct(product._id));
  };
  return (
    <div className='content content-margined'>
      <div className='product-header'>
        <h3 className='font-title'>Products</h3>
        <button className='button primary' onClick={() => openModal({})}>
          {' '}
          Create Product{' '}
        </button>
      </div>
      {modalVisible && (
        <div className='form'>
          <form onSubmit={submitHandler}>
            <div className='form'>
              <div>
                <h1 className='text-center font-title'>Create product</h1>
              </div>
              <div>
                {loadingSave && <div> Loading .. </div>}
                {errorSave && <div> {errorSave}</div>}
              </div>
              <div>
                <label htmlFor='name'>
                  <strong>Name</strong>
                </label>
                <input
                  value={name}
                  type='text'
                  name='name'
                  id='name'
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor='price'>
                  <strong>Price</strong>
                </label>
                <input
                  value={price}
                  type='text'
                  name='price'
                  id='price'
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor='image'>
                  <strong>Image</strong>
                </label>
                <input
                  value={image}
                  type='text'
                  name='image'
                  id='image'
                  onChange={(e) => setImage(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor='brand'>
                  <strong>Brand</strong>
                </label>
                <input
                  value={brand}
                  type='text'
                  name='brand'
                  id='brand'
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor='brand'>
                  <strong>Count in Stock</strong>
                </label>
                <input
                  value={countInStock}
                  type='text'
                  name='countInStock'
                  id='countInStock'
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor='category'>
                  <strong>Category</strong>
                </label>
                <input
                  value={category}
                  type='text'
                  name='category'
                  id='category'
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </div>

              <div>
                <label htmlFor='description'>
                  <strong>Description</strong>
                </label>
                <textarea
                  value={description}
                  name='description'
                  id='description'
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label htmlFor='rating'>
                  <strong>Rating</strong>
                </label>
                <input
                  value={rating}
                  type='text'
                  name='rating'
                  id='rating'
                  onChange={(e) => setRating(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor='numReviews'>
                  <strong>Numbers of reviews</strong>
                </label>
                <input
                  value={numReviews}
                  type='text'
                  name='numReviews'
                  id='numReviews'
                  onChange={(e) => setNumReviews(e.target.value)}
                ></input>
              </div>
              <div>
                <br />
                <button type='submit' className='button primary'>
                  {id ? 'Update' : 'Create'}
                </button>
                <br />
                <button
                  onClick={() => setModalVisible(false)}
                  type='submit'
                  className='button secondary'
                >
                  Back{' '}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {!modalVisible && (
        <div className='product-list'>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    {' '}
                    <button
                      className='button'
                      onClick={() => openModal(product)}
                    >
                      {' '}
                      Edit
                    </button>{' '}
                    <button
                      className='button'
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default ProductsScreen;
