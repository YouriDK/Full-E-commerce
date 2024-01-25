import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderDto } from './dto/order.dto';
import { User } from '../users/user.schema';
import { ShippingAddress } from '../shipping-address/shipping-address.schema';
import { Item } from '../item/item.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true, type: [Types.ObjectId], ref: Item.name })
  public order_items: Types.ObjectId[];

  @Prop({ required: true, type: Types.ObjectId, ref: ShippingAddress.name })
  public shipping_address: Types.ObjectId;

  @Prop({ required: true })
  public payment_method: string;

  @Prop({ required: true })
  public shipping_price: number;

  @Prop({ required: true })
  public items_price: number;

  @Prop({ required: true })
  public tax_price: number;

  @Prop({ required: true })
  public total_price: number;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  public user: Types.ObjectId;

  @Prop({ required: true, default: false })
  public isPaid: boolean;

  @Prop()
  public paidAt: Date;

  @Prop({ required: true })
  public isDelivered: boolean;

  @Prop({ required: true })
  public createdAt: Date;

  @Prop()
  public updatedAt: Date;

  @Prop()
  public deliveredAt: Date;

  @Prop({ required: true, type: Types.ObjectId, ref: 'paymentresults' })
  public payment_result?: Types.ObjectId;

  public constructor() {
    // * Something hehe
  }

  public hydrate(order: OrderDto): any {
    this.order_items = order.order_items.map(
      (orderItem) => new Types.ObjectId(orderItem),
    );
    this.shipping_address = new Types.ObjectId(order.shipping_address);
    this.shipping_price = order.shipping_price;
    this.payment_method = order.payment_method;
    this.items_price = order.items_price;
    this.tax_price = order.tax_price;
    this.total_price = order.total_price;
    this.user = new Types.ObjectId(order.user);
    this.isPaid = order.isPaid;
    this.isDelivered = order.isDelivered;
    this.paidAt = order.paidAt;
    this.deliveredAt = order.deliveredAt;
    this.payment_result = new Types.ObjectId(order?.payment_result);
    this.updatedAt = order?.updatedAt;
    this.createdAt = order?.createdAt;
    return this;
  }
}

export const OrderSchema = SchemaFactory.createForClass(Order);
