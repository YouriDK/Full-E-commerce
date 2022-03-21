import mongoose, { Document } from 'mongoose';
export interface Iproduct {
  // id: any;
  name: string;
  image: string;
  brand: string;
  category: 'Shoes' | 'Shirts' | 'Sweat' | 'Pants' | 'Joggings' | 'Underwears';
  price: number;
  countInStock: number;
  description: string;
  rating: number;
  numReviews: number;
}
export interface IproductDocument extends Iproduct, Document {
  _id: any;
}
const productsSchema = new mongoose.Schema<IproductDocument>({
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
