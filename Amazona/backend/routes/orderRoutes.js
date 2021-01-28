import express from "express";
import Order from "../models/orderModel";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../util.js";

const orderRoute = express.Router();

orderRoute.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty" });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
      });
      const createdOrder = await orders.save();
      res
        .status(201)
        .send({ message: "New order Created", order: createdOrder });
    }
  })
);

export default orderRoute;
