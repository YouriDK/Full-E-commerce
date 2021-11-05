import React, { useEffect, useState, FC } from 'react';
import { MdRestoreFromTrash } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../components/CustomInput';
import { Button } from 'reactstrap';

import { CATEGORY, texte } from '../data';
import { AiTwotoneEdit } from 'react-icons/ai';
import LoadingBox from '../components/LoadingBox';
import MesssageBox from '../components/MesssageBox';
import {
  listProducts,
  saveProduct,
  deleteProduct,
} from '../redux/actions/productActions';

const ProductsScreen: FC<any> = (props: any): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(0);

  const productSave = useSelector((state: any) => state.productSave);
  const productDelete = useSelector((state: any) => state.productDelete);
  const { success: successDelete } = productDelete;

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
  }, [successSave, successDelete, dispatch]);

  const openModal = (product: any) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);

    setImage(product.image ? product.image.split('/').pop() : product.image);
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
        image: `/images/${category}/${image}`,
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
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MesssageBox variant='danger' text={error} />
  ) : (
    <div className='content content-margined'>
      <div className='flex' style={{ justifyContent: 'space-between' }}>
        <Button
          className='button secondary'
          onClick={() =>
            modalVisible ? setModalVisible(false) : props.history.push('/')
          }
        >
          Back
        </Button>
        <Button
          className='button primary'
          onClick={() => openModal({})}
          disabled={modalVisible}
        >
          Create product
        </Button>
      </div>
      {modalVisible && (
        <div className='form'>
          <form onSubmit={submitHandler}>
            <div className='form'>
              <div>
                {loadingSave && <LoadingBox />}
                {errorSave && <MesssageBox variant='danger' text={errorSave} />}
              </div>
              <CustomInput
                variable={name}
                name='name'
                label='Name'
                type='text'
                change={setName}
              />
              <CustomInput
                variable={price}
                name='price'
                label='Price'
                type='number'
                change={setPrice}
              />
              <CustomInput
                variable={image}
                name='image'
                label='Image'
                type='file'
                change={setImage}
              />
              <CustomInput
                variable={brand}
                name='brand'
                label='Brand'
                type='text'
                change={setBrand}
              />
              <CustomInput
                variable={countInStock}
                name='countInStock'
                label='Count in Stock'
                type='number'
                change={setCountInStock}
              />
              <CustomInput
                variable={category}
                name='category'
                label='Category'
                type='select'
                options={CATEGORY}
                change={setCategory}
              />
              <CustomInput
                variable={description}
                name='description'
                label='Description'
                type='text'
                change={setDescription}
                textarea
              />
              <CustomInput
                variable={rating}
                name='rating'
                label='Rating'
                type='number'
                change={setRating}
              />
              <CustomInput
                variable={numReviews}
                name='numReviews'
                label='Numbers of reviews'
                type='number'
                change={setNumReviews}
              />
              <div>
                <br />
                <Button type='submit' className='button primary'>
                  {id ? 'Update' : 'Create'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
      {!modalVisible && (
        <div className='table-users'>
          <div className='header'>Products</div>
          <table className='table'>
            <tr className='table-tr'>
              {texte.Products.en.map((td: string, index: number) => (
                <td className='table-td table-title' key={index}>
                  {td}
                </td>
              ))}
            </tr>
            {products.map((product: any, index: number) => (
              <tr className='table-tr' key={index}>
                <td className='table-td font-secondary large xbold'>
                  {product.name}
                </td>
                <td className='table-td'>
                  {' '}
                  <img
                    src={product.image}
                    alt={product.name}
                    className='small'
                  />
                </td>

                <td className='table-td font-secondary large xbold'>
                  ${product.price}
                </td>
                <td className='table-td font-secondary large xbold'>
                  {product.category}
                </td>
                <td className='table-td font-secondary large xbold'>
                  {product.brand}
                </td>
                <td className='table-td'>
                  <>
                    <Button
                      onClick={() => openModal(product)}
                      className='primary'
                    >
                      <AiTwotoneEdit size={20} />
                    </Button>
                    <Button
                      onClick={() => deleteHandler(product)}
                      className='secondary'
                    >
                      <MdRestoreFromTrash size={20} />
                    </Button>
                  </>
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};
export default ProductsScreen;
