import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderDto, UpdateOrderDto } from './dto/order.dto';
import { Order, OrderDocument } from './order.schema';
import { Model } from 'mongoose';
import { ItemService } from '../item/item.service';
import { PaymentResultService } from '../payment-results/payment-results.service';
import { ShippingAddressService } from '../shipping-address/shipping-address.service';
import { ItemDto } from '../item/dto/item.dto';
import Promises from 'bluebird';
import { ShippingAddressDto } from '../shipping-address/dto/shipping-address.dto';
import { CreationOrderFailed } from './order.error';
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private order: Model<OrderDocument>,
    private itemService: ItemService,
    private paymentResultService: PaymentResultService,
    private shippingAddressService: ShippingAddressService,
  ) {}
  async create(orderDatas: OrderDto) {
    console.log('⚜ Service -> Create order... ⚜');
    console.log('⚜ Create Items... ⚜');
    // * Check if it's an item or string
    const item_list =
      orderDatas.order_items[0] instanceof ItemDto
        ? await Promises.map(
            orderDatas.order_items as ItemDto[],
            async (item: ItemDto): Promise<string> => {
              return (await this.itemService.create(item))._id;
            },
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
      paidAt: orderDatas.paidAt ?? undefined,
      deliveredAt: orderDatas.deliveredAt ?? undefined,
      payment_result: orderDatas.payment_result ?? undefined,
    };
    const order = await new Order().fill(orderRealDatas);
    const new_order = new this.order(order);
    if (!new_order) {
      const err = new CreationOrderFailed();
      console.log(err);
      throw err;
    }

    // * Update the  other intels
    await Promises.map(item_list as string[], async (id: string) => {
      return await this.itemService.update(id, { order_id: new_order._id });
    });
    await this.shippingAddressService.update(shippingAdd as string, {
      order_id: new_order._id,
    });
    console.log('✅ Service -> Create product success ✅');
    return new_order;
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
