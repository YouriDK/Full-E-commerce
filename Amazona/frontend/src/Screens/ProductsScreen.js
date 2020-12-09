import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, saveProduct } from "../actions/productActions";

function Productscreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const productSave = useSelector((state) => state.productSave);

  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = productSave;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
    return () => {
      /* *  return nothing*/
    };
  }, []);
  // ! If you don't put , [] at the end , he will start again over and over

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        name,
        image,
        brand,
        price,
        category,
        countInStock,
        description,
      })
    );
  };
  return (
    <div className=" content content-margined">
      <div className="product-header">
        <h3>Product</h3>
        <button onClick={() => openModal({})}> Create Product </button>
      </div>
      {modalVisible && (
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2 className="text-center">Create product</h2>
              </li>
              <li>
                {loadingSave && <div> Loading .. </div>}
                {errorSave && <div> {errorSave}</div>}
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  value={name}
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  value={price}
                  type="text"
                  name="price"
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  value={image}
                  type="text"
                  name="image"
                  id="image"
                  onChange={(e) => setImage(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  value={brand}
                  type="text"
                  name="brand"
                  id="brand"
                  onChange={(e) => setBrand(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="brand">Count in Stock</label>
                <input
                  value={countInStock}
                  type="text"
                  name="countInStock"
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="category">Category</label>
                <input
                  value={category}
                  type="text"
                  name="category"
                  id="category"
                  onChange={(e) => setCategory(e.target.value)}
                ></input>
              </li>

              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  value={description}
                  type="text"
                  name="description"
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  {id ? "Update" : "Create"}
                </button>
                <button
                  onClick={() => setModalVisible(false)}
                  type="submit"
                  className="button secondary"
                >
                  Back{" "}
                </button>
              </li>
            </ul>
          </form>
        </div>
      )}
      <div className="product-list"></div>
      <table>
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
          {products.map((product) => (
            <tr>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                {" "}
                <button onClick={() => openModal(product)}> Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Productscreen;
