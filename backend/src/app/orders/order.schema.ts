import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ItemDto } from '../item/dto/item.dto';
import { PaymentResultDto } from '../payment-results/dto/payment-result.dto';
import { ShippingAddressDto } from '../shipping-address/dto/shipping-address.dto';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  public order_items: string[] | ItemDto[];

  @Prop({ required: true })
  public shipping_address: ShippingAddressDto | string;

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

  @Prop({ required: true, default: 0 })
  public user: string;

  @Prop({ required: true })
  public isPaid: boolean;

  @Prop({ required: true })
  public paidAt: Date;

  @Prop({ required: true })
  public isDelivered: boolean;

  @Prop({ required: true })
  public deliveredAt: Date;
  @Prop()
  public payment_result?: PaymentResultDto | string[];

  public constructor() {
    // * Something hehe
  }

  public fill(order: {
    order_items: ItemDto[] | string[];
    shipping_address: ShippingAddressDto | string;
    shipping_price: number;
    payment_method: string;
    items_price: number;
    tax_price: number;
    total_price: number;
    user: string;
    isPaid: boolean;
    paidAt: Date;
    deliveredAt: Date;
    payment_result?: PaymentResultDto | string[];
  }): any {
    this.order_items = order.order_items;
    this.shipping_address = order.shipping_address;
    this.shipping_price = order.shipping_price;
    this.payment_method = order.payment_method;
    this.items_price = order.items_price;
    this.tax_price = order.tax_price;
    this.total_price = order.total_price;
    this.user = order.user;
    this.isPaid = order.isPaid;
    this.paidAt = order.paidAt;
    this.deliveredAt = order.deliveredAt;
    this.payment_result = order?.payment_result;
    return this;
  }
}

export const OrderSchema = SchemaFactory.createForClass(Order);
