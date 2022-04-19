import express from 'express';
import Order from '../models/orderModel';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../utils';
import {
  CreateOrderError,
  OrderNotFoundError,
  ProductNotFoundError,
} from '../errors/error-generator';

const orderRoute = express.Router();
orderRoute.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res): Promise<any> => {
    console.log('✔ Orders -> fetch all');
    const orders = await Order.find({}).populate('user', 'name');
    res.send(orders);
  })
);

orderRoute.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req: any, res): Promise<any> => {
    console.log('✔ Orders -> fetch One');
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRoute.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req: any, res): Promise<any> => {
    console.log('✔ Orders -> post One');
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Cart is empty' });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      if (createdOrder) {
        return res
          .status(201)
          .send({ message: 'New order Created', order: createdOrder });
      } else return res.status(500).send(CreateOrderError());
    }
  })
);

orderRoute.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res): Promise<any> => {
    console.log('✔ Orders -> get One');
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send(OrderNotFoundError());
    }
  })
);

orderRoute.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res): Promise<any> => {
    console.log('✔ Orders -> pay 💸 ');
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send(OrderNotFoundError());
    }
  })
);

orderRoute.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res): Promise<any> => {
    console.log('✔ Orders -> delete one');
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
      res.status(404).send(OrderNotFoundError());
    }
  })
);

orderRoute.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res): Promise<any> => {
    console.log('✔ Orders -> deliver one');
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updateOrder = await order.save();
      res.send({ message: 'Order Delivered', order: updateOrder });
    } else {
      res.status(404).send(OrderNotFoundError());
    }
  })
);

export default orderRoute;
