import React, { FC, useEffect, useState } from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';
import { MdRestoreFromTrash } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import CustomInput from '../components/CustomInput';
import LoadingBox from '../components/LoadingBox';
import MesssageBox from '../components/MesssageBox';
import { Categories, texte } from '../data';
import Dropzone from 'react-dropzone';
import {
  deleteProduct,
  listProducts,
  saveProduct,
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
  const convertFileToBase64 = (file: any): any =>
    new Promise((resolve: any, reject: any): any => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (): any => (
        setImage(reader.result as string), (reader.onerror = reject)
      );
    });

  const handleDrop = (acceptedFiles: any[]): void => {
    convertFileToBase64(acceptedFiles[0]);
  };
  const deleteHandler = (product: any) => {
    console.log('delete', product._id);
    dispatch(deleteProduct(product._id));
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MesssageBox variant='danger' error={error} />
  ) : (
    <div className='content content-margined'>
      <div
        className='flex'
        style={{ justifyContent: 'space-between', marginTop: '20px' }}
      >
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
          hidden={modalVisible}
        >
          Create product
        </Button>
      </div>
      {modalVisible && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ width: '500px' }}>
            <form onSubmit={submitHandler}>
              <div className='form'>
                <div>
                  {loadingSave && <LoadingBox />}
                  {errorSave && (
                    <MesssageBox variant='danger' text={errorSave} />
                  )}
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
                <Dropzone
                  onDrop={handleDrop}
                  accept={{ 'image/jpeg': ['.jpeg', '.png'] }}
                >
                  {({ getRootProps, getInputProps }: any): any => (
                    <div
                      {...getRootProps({ className: 'dropzone' })}
                      style={{
                        marginTop: '12px',
                        marginBottom: '12px',
                        borderRadius: '10px',
                        minHeight: '100px',
                        backgroundColor: 'white',
                        boxShadow:
                          'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
                      }}
                    >
                      <input {...getInputProps()} />

                      <div
                        style={{
                          width: '100%',
                          textAlign: 'center',
                          margin: 'auto',
                        }}
                      >
                        <Button className='button secondary' type='button'>
                          Add File
                        </Button>
                      </div>
                    </div>
                  )}
                </Dropzone>
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
                  options={Categories}
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
          {image !== '' && (
            <img
              src={image}
              alt='product'
              style={{ maxWidth: '450px', maxHeight: '450px' }}
            />
          )}
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
                      style={{ marginLeft: '5px' }}
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
