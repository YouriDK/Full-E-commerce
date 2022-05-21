import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemDto } from '../item/dto/item.dto';
import { ItemService } from '../item/item.service';
import {
  PaymentResultDto,
  UpdatePaymentResultDto,
} from '../payment-results/dto/payment-result.dto';
import { PaymentResultService } from '../payment-results/payment-results.service';
import { ShippingAddressDto } from '../shipping-address/dto/shipping-address.dto';
import { ShippingAddressService } from '../shipping-address/shipping-address.service';
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
  constructor(
    @InjectModel(Order.name)
    private order: Model<OrderDocument>,
    private itemService: ItemService,
    private paymentResultService: PaymentResultService,
    private shippingAddressService: ShippingAddressService,
  ) {}
  async create(orderDatas: OrderDto): Promise<Order> {
    // * Good to GO !
    // ! Ajouter le Create at & UpdatedAt
    console.log('⚜ Service -> Create order... ⚜');
    console.log('⚜ Create Items... ⚜');
    // * Check if it's an item or string
    const item_list =
      orderDatas.order_items[0] && orderDatas.order_items[0] instanceof Object
        ? await Promise.all(
            (orderDatas.order_items as ItemDto[]).map(
              async (item: ItemDto): Promise<string> =>
                (
                  await this.itemService.create(item)
                )._id,
            ),
          )
        : orderDatas.order_items;
    console.log('✅ Items  ✅ ');
    console.log('⚜ Create Shipping... ⚜');
    const shippingAdd =
      orderDatas.shipping_address instanceof String
        ? orderDatas.shipping_address
        : (
            await this.shippingAddressService.create(
              orderDatas.shipping_address as ShippingAddressDto,
            )
          )._id;
    console.log('✅ Shipping  ✅ ');
    console.log('⚜ Create Order instance... ⚜');

    const orderRealDatas: OrderDto = {
      order_items: item_list,
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
    console.log('orderRealDatas', orderRealDatas);
    const order = await new Order().fill(orderRealDatas);
    const new_order = new this.order(order);
    if (!new_order) {
      const err = new CreationOrderFailed();
      console.log(err);
      throw err;
    }

    // * Update the other intels
    await Promise.all(
      (item_list as string[]).map(async (id: string) => {
        return await this.itemService.update(id, { order_id: new_order._id });
      }),
    );
    await this.shippingAddressService.update(shippingAdd as string, {
      order_id: new_order._id,
    });
    console.log('✅ Service -> Create Order success ✅');

    return new_order.save();
  }

  async findAll(): Promise<OrderDto[]> {
    console.log('⚜ Service -> Get all Orders... ⚜');
    const orders = await this.order.find();
    if (!orders) {
      const err = new OrderListFailed();
      console.log(err);
      throw err;
    }
    console.log('⚜ Service -> Filling Orders... ⚜');
    const ordersFilled = await Promise.all(
      orders.map(async (order: OrderDto) => await this.fill(order)),
    );
    console.log('✅ Service -> Get list Order success ✅');
    return ordersFilled;
  }
  async findSome(userID: string): Promise<OrderDto[]> {
    console.log('⚜ Service -> Get Orders from specific user... ⚜');
    const orders = await this.order.find({ user: userID });
    if (!orders) {
      const err = new OrderListFailed();
      console.log(err);
      throw err;
    }
    console.log('⚜ Service -> Filling Orders... ⚜');
    const ordersFilled = await Promise.all(
      orders.map(async (order: OrderDto) => await this.fill(order)),
    );
    console.log('✅ Service -> Get list Order success ✅');
    return ordersFilled;
  }

  async findOne(id: string): Promise<OrderDto> {
    console.log('⚜ Service -> Get a Order ⚜');
    const order = await this.order.findOne({ _id: id });
    if (!order) {
      const err = new OrderNotFound(id);
      console.log(err);
      throw err;
    }
    console.log('⚜ Service -> Filling Order... ⚜');
    const order_filled = await this.fill(order);
    console.log('✅ Service -> Get a Order success ✅');
    return order_filled;
  }

  async update(id: string, orderDatas: UpdateOrderDto) {
    // TODO Appeler chaque object pour modifier
    console.log('⚜ Service -> Update a Order ⚜');
    const order = await this.order.findOne({ _id: id });
    if (!order) {
      const err = new OrderNotFound(id);
      console.log(err);
      throw err;
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
      console.log(error);
      const err = new UpdateOrderFailed(id);
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> update a Order success ✅');
    return await this.order.findById(id);
  }
  async pay(id: string, modeyDatas: PaymentResultDto) {
    console.log('⚜ Service -> Pay an Order ⚜');
    const order = await this.order.findOne({ _id: id });
    if (!order) {
      const err = new OrderNotFound(id);
      console.log(err);
      throw err;
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
      console.log(error);
      const err = new UpdateOrderFailed(id);
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> Pay an Order success ✅');
    return await this.order.findById(id);
  }
  async deliver(id: string) {
    console.log('⚜ Service -> Deliver an Order ⚜');
    const order = await this.order.findOne({ _id: id });
    if (!order) {
      const err = new OrderNotFound(id);
      console.log(err);
      throw err;
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
      const err = new UpdateOrderFailed(id);
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> Deliver an Order success ✅');
    return await this.order.findById(id);
  }

  async remove(id: string) {
    console.log('⚜ Service -> Delete an order ⚜');
    const order = await this.order.findById(id);
    console.log('⚜ Service -> Deleting item list... ⚜');
    const delete_orders_items = await Promise.all(
      (order.order_items as string[]).map(
        async (id: string) => await this.itemService.remove(id),
      ),
    );
    console.log('✅ Service -> Delete a item list ✅', delete_orders_items);
    const delete_shipping_stuff = await this.shippingAddressService.remove(
      order.shipping_address as string,
    );
    console.log('⚜ Service -> Deleted ⚜', delete_shipping_stuff);
    if (order.payment_result) {
      console.log('⚜ Service -> Deleting payment_result... ⚜');
      await this.paymentResultService.remove(order.payment_result as string);
    }
    const order_deleted = await this.order.deleteOne({ _id: id });
    // TODO do a check to throw new if needed
    console.log('✅ Service -> Delete a order success ✅');
    return order_deleted;
  }

  private async fill(order: OrderDto) {
    const item_list = await Promise.all(
      (order.order_items as string[]).map(
        async (item: string) => await this.itemService.findOne(item),
      ),
    );
    const shipping = await this.shippingAddressService.findOne(
      order.shipping_address as string,
    );
    let payment_resultFilled = null;
    if (order.payment_result) {
      payment_resultFilled = await this.paymentResultService.findOne(
        order.payment_result as string,
      );
    }

    return {
      _id: order._id,
      order_items: item_list,
      shipping_address: shipping,
      payment_result: payment_resultFilled ?? order.payment_result,
      shipping_price: order.shipping_price,
      payment_method: order.payment_method,
      items_price: order.items_price,
      tax_price: order.tax_price,
      total_price: order.total_price,
      user: order.user,
      isPaid: order.isPaid,
      isDelivered: order.isDelivered,
      paidAt: order.paidAt,
      deliveredAt: order.deliveredAt,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
