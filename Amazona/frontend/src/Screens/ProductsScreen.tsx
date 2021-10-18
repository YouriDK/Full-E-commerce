import React, { useEffect, useState, FC } from 'react';
import { MdRestoreFromTrash } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../components/CustomInput';
import { Button } from 'reactstrap';
import {
  listProducts,
  saveProduct,
  deleteProduct,
} from '../actions/productActions';
import { texte } from '../data';
import { AiTwotoneEdit } from 'react-icons/ai';

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
      <div className='flex' style={{ justifyContent: 'space-between' }}>
        <Button
          className='button secondary'
          onClick={() => props.history.push('/')}
        >
          Back
        </Button>
        <button
          className='button primary'
          onClick={() => openModal({})}
          disabled={modalVisible}
        >
          Create product
        </button>
      </div>
      {modalVisible && (
        <div className='form'>
          <form onSubmit={submitHandler}>
            <div className='form'>
              <div>
                {loadingSave && <div> Loading .. </div>}
                {errorSave && <div> {errorSave}</div>}
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
                type='text'
                change={setPrice}
              />
              <CustomInput
                variable={image}
                name='image'
                label='Image'
                type='text'
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
                type='text'
                change={setCountInStock}
              />
              <CustomInput
                variable={category}
                name='category'
                label='Category'
                type='text'
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
                type='text'
                change={setRating}
              />
              <CustomInput
                variable={numReviews}
                name='numReviews'
                label='Numbers of reviews'
                type='text'
                change={setNumReviews}
              />
              <div>
                <br />
                <button type='submit' className='button primary'>
                  {id ? 'Update' : 'Create'}
                </button>
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
              {texte.Products.en.map((td: string) => (
                <td className='table-td'>{td}</td>
              ))}
            </tr>
            {products.map((product: any) => (
              <tr className='table-tr' key={product._id}>
                <td className='table-td'>{product.name}</td>
                <td className='table-td'>{product.price}</td>
                <td className='table-td'>{product.category}</td>
                <td className='table-td'>{product.brand}</td>
                <td className='table-td'>
                  <>
                    <Button onClick={() => openModal(product)} color='info'>
                      <AiTwotoneEdit size={20} />
                    </Button>
                    <Button onClick={() => deleteHandler(product)} color='info'>
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
