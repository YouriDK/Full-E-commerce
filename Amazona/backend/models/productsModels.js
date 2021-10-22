import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Shoes', 'Shirts', 'Sweat', 'Pants', 'Joggings', 'Underwears'],
  },
  price: { type: Number, default: 0, required: true },
  countInStock: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
});

const productModel = mongoose.model('Product', productsSchema);

export default productModel;
