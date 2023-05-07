import { useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';
import { MdRestoreFromTrash } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import * as Yup from 'yup';

import Dropzone from 'react-dropzone';
import LoadingBox from '../components/LoadingBox';
import MesssageBox from '../components/MesssageBox';
import { Categories, texte } from '../data';
import {
  deleteProduct,
  listProducts,
  saveProduct,
} from '../redux/actions/productActions';
import { AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const ProductsScreen: FC<any> = (): JSX.Element => {
  // const intl = useIntl();
  const letsGoTo = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const productSave = useSelector((state: any) => state.productSave);
  const productDelete = useSelector((state: any) => state.productDelete);
  const { success: successDelete } = productDelete;
  const productList = useSelector((state: any) => state.productList);
  const { loading, products, error } = productList;
  const isMobile = useSelector((state: any) => state.isMobile.isMobile);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (successSave) setModalVisible(false);
    dispatch(listProducts());
  }, [successSave, successDelete, dispatch]);

  const openModal = (product: any) => {
    setModalVisible(true);
    setId(product._id);
    formik.setValues({
      brand: product.brand,
      name: product.name,
      image: product.image,
      category: product.category,
      countInStock: product.countInStock,
      description: product.description,
      numReviews: product.numReviews,
      price: product.price,
      rating: product.rating,
    });
  };

  const convertFileToBase64 = (file: any): any =>
    new Promise((resolve: any, reject: any): any => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (): any => {
          formik.setFieldValue('image', reader.result as string);
        };
      } catch (err: any) {
        throw new Error(`${reject} AND ${err}`);
      }
    });

  const handleDrop = (acceptedFiles: File[]): void => {
    convertFileToBase64(acceptedFiles[0]);
  };
  const deleteHandler = (product: any) => {
    dispatch(product._id);
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      brand: '',
      image: '',
      countInStock: '',
      category: '',
      description: '',
      rating: '',
      numReviews: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      image: Yup.string(),
      brand: Yup.string(),
      countInStock: Yup.string(),
      category: Yup.string(),
      description: Yup.string(),
      rating: Yup.number(),
      numReviews: Yup.number(),
    }),
    onSubmit: async (values: any) => {
      dispatch({
        type: saveProduct({
          _id: id,
          ...values,
        }),
      });
    },
  });

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MesssageBox variant='danger' error={error} />
  ) : (
    <div
      className='content content-margined'
      style={{ width: isMobile ? (modalVisible ? '70%' : '100%') : '100%' }}
    >
      <div
        className='flex'
        style={{ justifyContent: 'space-between', marginTop: '20px' }}
      >
        <Button
          className='button secondary'
          onClick={() =>
            modalVisible ? setModalVisible(false) : letsGoTo('/')
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
            <form onSubmit={formik.handleSubmit}>
              <div className='form'>
                <div>
                  {loadingSave && <LoadingBox />}
                  {errorSave && (
                    <MesssageBox variant='danger' text={errorSave} />
                  )}
                </div>
                <div>
                  <label htmlFor={formik.getFieldProps('name').name}>
                    <span>{'Name'}</span>
                  </label>
                  <input {...formik.getFieldProps('name')}></input>
                </div>
                <div>
                  <label htmlFor={formik.getFieldProps('price').name}>
                    <span>{'Price'}</span>
                  </label>
                  <input
                    // * pattern={'[0-9]*'}
                    type='number'
                    {...formik.getFieldProps('price')}
                  ></input>
                </div>

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
                <div>
                  <label htmlFor={formik.getFieldProps('brand').name}>
                    <span>{'Brand'}</span>
                  </label>
                  <input {...formik.getFieldProps('brand')}></input>
                </div>
                <div>
                  <label htmlFor={formik.getFieldProps('countInStock').name}>
                    <span>{'Count in Stock'}</span>
                  </label>
                  <input
                    // * pattern={'[0-9]*'}
                    type='number'
                    {...formik.getFieldProps('countInStock')}
                  ></input>
                </div>
                <div>
                  <label htmlFor={formik.getFieldProps('category').name}>
                    <span>{'Category'}</span>
                  </label>
                  <select {...formik.getFieldProps('category')}>
                    {Categories.map((category: string) => (
                      <option
                        value={category}
                        key={category}
                        selected={
                          formik.getFieldProps('brand').value === category
                        }
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor={formik.getFieldProps('description').name}>
                    <span>{'Description'}</span>
                  </label>
                  <textarea
                    {...formik.getFieldProps('description')}
                    style={{ minHeight: isMobile ? '160px' : '' }}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor={formik.getFieldProps('rating').name}>
                    <span>{'Rating'}</span>
                  </label>
                  <input
                    type='number'
                    {...formik.getFieldProps('rating')}
                  ></input>
                </div>
                <div>
                  <label htmlFor={formik.getFieldProps('numReviews').name}>
                    <span>{'Numbers of reviews'}</span>
                  </label>
                  <input
                    type='number'
                    {...formik.getFieldProps('numReviews')}
                  ></input>
                </div>

                <div>
                  <br />
                  <Button type='submit' className='button primary'>
                    {id ? 'Update' : 'Create'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
          {formik.getFieldProps('image').value !== '' && !isMobile && (
            <img
              src={formik.getFieldProps('image').value}
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
            {!isMobile && (
              <tr className='table-tr'>
                {texte.Products.en.map((td: string, index: number) => (
                  <td className='table-td table-title' key={index}>
                    {td}
                  </td>
                ))}
              </tr>
            )}
            {products.map((product: any, index: number) => (
              <tr className='table-tr' key={index}>
                {!isMobile && (
                  <td className='table-td font-secondary large xbold'>
                    {product.name}
                  </td>
                )}
                <td
                  className='table-td'
                  style={{ minWidth: isMobile ? '50px' : '' }}
                >
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
                      style={{ marginLeft: isMobile ? '' : '5px' }}
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
