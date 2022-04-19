import express from 'express';
import Product from '../models/productsModels';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAdmin } from '../utils';
import {
  CreateProductdError,
  DeleteProductdError,
  ProductNotFoundError,
  UpdateProductdError,
  ProducstNotFoundError,
} from '../errors/error-generator';

const router = express.Router();

router.get(
  '/',
  expressAsyncHandler(async (req, res): Promise<any> => {
    console.log('🙌 Products -> fetch all');
    const products = await Product.find();
    if (products) {
      return res.status(200).send(products);
    } else res.status(404).send(ProducstNotFoundError());
  })
);

router.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    console.log('🙌 Products -> get one');
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      res.status(200).send(product);
    } else res.status(404).send(ProductNotFoundError());
  })
);

router.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res): Promise<any> => {
    console.log('🙌 Products -> post one');
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      description: req.body.description,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
    });
    const newProduct = await product.save();
    if (newProduct) {
      return res
        .status(201)
        .send({ message: ' New Product created ! ', data: newProduct });
    }
    return res.status(500).send(CreateProductdError());
  })
);

router.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res): Promise<any> => {
    console.log('🙌 Products -> update one');
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      (product.name = req.body.name),
        (product.price = req.body.price),
        (product.image = req.body.image),
        (product.brand = req.body.brand),
        (product.category = req.body.category),
        (product.countInStock = req.body.countInStock),
        (product.description = req.body.description);
    }

    const upatedProduct = await product?.save();
    if (upatedProduct) {
      return res
        .status(201)
        .send({ message: ' Product Updated ', data: upatedProduct });
    }
    return res.status(500).send(UpdateProductdError());
  })
);

router.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res): Promise<any> => {
    console.log('🙌 Products -> Delete one');
    const deleteProduct = await Product.findById(req.params.id);
    if (deleteProduct) {
      await deleteProduct.remove();
      return res.status(200).send({ message: 'Product Deleted' });
    }
    return res.status(500).send(DeleteProductdError());
  })
);
export default router;
