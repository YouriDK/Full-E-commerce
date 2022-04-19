import mongoose, { Document } from 'mongoose';

export interface IItems {
  name: string;
  qty: number;
  image: string;
  product: mongoose.Schema.Types.ObjectId | any;
}
export interface IpaymentResult {
  id: any;
  status: any;
  update_time: any;
  email_address: string;
}
export interface IshippingAddress {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Iorder {
  // id: any;
  orderItems: IItems[];
  shippingAddress: IshippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  user: mongoose.Schema.Types.ObjectId;
  isPaid: boolean;
  paidAt: Date | number;
  isDelivered: boolean;
  deliveredAt: Date | number;
  paymentResult: IpaymentResult;
}
export interface IorderDocument extends Iorder, Document {
  _id: any;
}
const orderSchema = new mongoose.Schema<IorderDocument>(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
