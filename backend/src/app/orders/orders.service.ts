import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ioptions } from 'src/utils';
import { CreateItemDto } from '../item/dto/create-item.dto';
import { ItemService } from '../item/item.service';
import { CreatePaymentResultDto } from '../payment-results/dto/create-payment-result.dto';
import { PaymentResultService } from '../payment-results/payment-results.service';
import { ShippingAddressService } from '../shipping-address/shipping-address.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto, UpdateOrderDto } from './dto/order.dto';
import {
  CreationOrderFailed,
  OrderListFailed,
  OrderNotFound,
  UpdateOrderFailed,
} from './order.error';
import { Order, OrderDocument } from './order.schema';
@Injectable()
export class OrdersService {
  private readonly loggerService = new Logger();
  constructor(
    @InjectModel(Order.name)
    private order: Model<OrderDocument>,
    private itemService: ItemService,
    private paymentResultService: PaymentResultService,
    private shippingAddressService: ShippingAddressService,
  ) {}
  async create(orderDatas: CreateOrderDto): Promise<Order> {
    // ! Ajouter le Create at & UpdatedAt
    this.loggerService.log('⚒ OrdersService -> Creating order... ⚒');
    this.loggerService.log('⚒ Create Items... ⚒');
    // * Check if it's an item or string
    let itemList: string[] = [];
    for (const item of orderDatas.order_items as CreateItemDto[]) {
      const itemCreation = await this.itemService.create(item);
      if (itemCreation) {
        itemList.push(`${itemCreation._id}`);
      }
    }
    //  ! CHECK WHEN IT COULD BE STRING
    // orderDatas.order_items[0] && orderDatas.order_items[0] instanceof Object
    //   ? await Promise.all(
    //       (orderDatas.order_items as ItemDto[]).map(
    //         async (item: CreateItemDto): Promise<string> =>
    //           (
    //             await this.itemService.create(item)
    //           )._id,
    //       ),
    //     )
    //   : orderDatas.order_items;
    this.loggerService.log('✅ Items  ✅ ');
    this.loggerService.log('⚒ Create Shipping... ⚒');
    const shippingAdd = (
      await this.shippingAddressService.create(orderDatas.shipping_address)
    )._id;
    // ! Check why dat
    // orderDatas.shipping_address instanceof String
    //   ? orderDatas.shipping_address
    //   : (
    //       await this.shippingAddressService.create(
    //         orderDatas.shipping_address as ShippingAddressDto,
    //       )
    //     )._id;
    this.loggerService.log('✅ Shipping  ✅ ');
    this.loggerService.log('⚒ Create Order instance... ⚒');
    const orderRealDatas: OrderDto = {
      order_items: itemList,
      shipping_address: shippingAdd,
      shipping_price: orderDatas.shipping_price,
      payment_method: orderDatas.payment_method,
      items_price: orderDatas.items_price,
      tax_price: orderDatas.tax_price,
      total_price: orderDatas.total_price,
      user: orderDatas.user,
      isPaid: orderDatas.isPaid ?? false,
      isDelivered: orderDatas.isDelivered ?? false,
      paidAt: orderDatas.paidAt ?? null,
      deliveredAt: orderDatas.deliveredAt ?? null,
      payment_result: orderDatas.payment_result ?? null,
      createdAt: orderDatas.createdAt ?? new Date(Date.now()),
      updatedAt: orderDatas.updatedAt ?? null,
    };
    const order = await new Order().hydrate(orderRealDatas);
    const new_order = new this.order(order);
    if (!new_order) {
      throw new CreationOrderFailed();
    }

    // * Update the other intels
    for (const item of itemList) {
      await this.itemService.update(item, { order_id: new_order._id });
    }

    await this.shippingAddressService.update(shippingAdd as string, {
      order_id: new_order._id,
    });
    const newOrderSaved = new_order.save();
    this.loggerService.log('✅ OrdersService -> Create Order success ✅');

    return newOrderSaved;
  }

  async getAll(options?: Ioptions): Promise<OrderDocument[]> {
    this.loggerService.log('⚒ OrdersService -> Get all Orders... ⚒');
    const orders = await this.order
      .find()
      .populate('order_items')
      .populate('shipping_address')
      .populate('payment_result')
      .populate('user')
      .limit(options?.limit ?? 10000000);

    if (!orders) {
      throw new OrderListFailed();
    }
    this.loggerService.log('✅ OrdersService -> Get list Order success ✅');
    return orders;
  }

  // TODO Fusionner FindAll & FindSome
  async findSome(userID: string): Promise<OrderDocument[]> {
    this.loggerService.log(
      '⚒ OrdersService -> Get Orders from specific user... ⚒',
    );
    console.log('❤ ~ OrdersService ~ findSome ~ userID->', userID);
    const orders = await this.order
      .find({ user: userID })
      .populate('order_items')
      .populate('shipping_address')
      .populate('user')
      .populate('payment_result');
    this.loggerService.log('✅ orders  ,', orders);
    if (!orders) {
      throw new OrderListFailed();
    }
    this.loggerService.log('✅ OrdersService -> Get list Order success ✅');
    return orders;
  }

  async findOne(id: string): Promise<OrderDocument> {
    this.loggerService.log('⚒ OrdersService -> Get a Order ⚒');
    const order = await this.order
      .findOne({ _id: id })
      .populate('order_items')
      .populate('shipping_address')
      .populate('payment_result');
    if (!order) {
      throw new OrderNotFound(id);
    }
    return order;
  }

  async update(id: string, orderDatas: UpdateOrderDto) {
    // TODO Appeler chaque object pour modifier
    this.loggerService.log('⚒ OrdersService -> Update a Order ⚒');
    const order = await this.order.findOne({ _id: id });
    if (!order) {
      throw new OrderNotFound(id);
    }
    try {
      await this.order.updateOne(
        { _id: id },
        {
          order_items: orderDatas.order_items ?? order.order_items,
          shipping_address:
            orderDatas.shipping_address ?? order.shipping_address,
          shipping_price: orderDatas.shipping_price ?? order.shipping_price,
          payment_method: orderDatas.payment_method ?? order.payment_method,
          items_price: orderDatas.items_price ?? order.items_price,
          tax_price: orderDatas.tax_price ?? order.tax_price,
          total_price: orderDatas.total_price ?? order.total_price,
          user: orderDatas.user ?? order.user,
          isPaid: orderDatas.isPaid ?? order.isPaid,
          paidAt: orderDatas.paidAt ?? order.paidAt,
          deliveredAt: orderDatas.deliveredAt ?? order.deliveredAt,
          payment_result: orderDatas.payment_result ?? order.payment_result,
          createdAt: orderDatas.createdAt ?? order.createdAt,
          updatedAt: orderDatas.updatedAt ?? new Date(Date.now()),
        },
      );
    } catch (error) {
      throw new UpdateOrderFailed(id);
    }
    this.loggerService.log('✅ OrdersService -> update a Order success ✅');
    return await this.order.findById(id);
  }
  async pay(id: string, modeyDatas: CreatePaymentResultDto) {
    this.loggerService.log('⚒ OrdersService -> Pay an Order ⚒');
    const order = await this.order.findOne({ _id: id });
    if (!order) {
      throw new OrderNotFound(id);
    }

    try {
      const payment = await this.paymentResultService.create(modeyDatas);
      await this.order.updateOne(
        { _id: id },
        {
          isPaid: true,
          paidAt: new Date(Date.now()),
          payment_result: payment?._id,
        },
      );
    } catch (error) {
      throw new UpdateOrderFailed(id);
    }
    this.loggerService.log('✅ OrdersService -> Pay an Order success ✅');
    return await this.order.findById(id);
  }
  async deliver(id: string) {
    this.loggerService.log('⚒ OrdersService -> Deliver an Order ⚒');
    const order = await this.order.findOne({ _id: id });
    if (!order) {
      throw new OrderNotFound(id);
    }
    try {
      await this.order.updateOne(
        { _id: id },
        {
          isDelivered: true,
          deliveredAt: new Date(Date.now()),
        },
      );
    } catch (error) {
      throw new UpdateOrderFailed(id);
    }
    this.loggerService.log('✅ OrdersService -> Deliver an Order success ✅');
    return await this.order.findById(id);
  }

  async remove(id: string): Promise<void> {
    this.loggerService.log('⚒ OrdersService -> Delete an order ⚒');
    const order = await this.order.findById(id);
    this.loggerService.log('⚒ OrdersService -> Deleting item list... ⚒');
    for (const orderItemId of order.order_items) {
      await this.itemService.remove(`${orderItemId}`);
    }

    // const delete_orders_items = await Promise.all(
    //   (order.order_items as string[]).map(
    //     async (id: string) => await this.itemService.remove(id),
    //   ),
    // );
    // this.loggerService.log('✅ OrdersService -> Delete a item list ✅', delete_orders_items);
    await this.shippingAddressService.remove(`${order.shipping_address}`);
    // const delete_shipping_stuff = await this.shippingAddressService.remove(
    //   order.shipping_address as string,
    // );
    // this.loggerService.log('⚒ OrdersService -> Deleted ⚒', delete_shipping_stuff);
    if (order.payment_result) {
      this.loggerService.log('⚒ OrdersService -> Deleting payment_result... ⚒');
      await this.paymentResultService.remove(`${order.payment_result}`);
    }
    // const order_deleted = await this.order.deleteOne({ _id: id });
    // TODO do a check to throw new if needed
    this.loggerService.log('✅ OrdersService -> Delete a order success ✅');
    // return order_deleted;
  }
}
