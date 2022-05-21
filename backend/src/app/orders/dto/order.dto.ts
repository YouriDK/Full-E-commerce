import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ItemDto } from '../../item/dto/item.dto';
import { PaymentResultDto } from '../../payment-results/dto/payment-result.dto';
import { ShippingAddressDto } from '../../shipping-address/dto/shipping-address.dto';

/* // info Old name : qty to replace in DB
 * orderItems -> order_items
 * shippingAddress -> shipping_address
 * paymentMethod -> payment_method
 * shippingPrice -> shipping_price
 * itemsPrice -> items_price
 * orderItems -> order_items
 * taxPrice -> tax_price
 * totalPrice -> total_price
 */
export class OrderDto {
  @IsOptional() public _id?: string;
  @IsNotEmpty() public order_items: string[] | ItemDto[];
  @IsNotEmpty() public shipping_address!: ShippingAddressDto | string;
  @IsNumber() public shipping_price!: number;
  @IsString() public payment_method!: string;
  @IsNumber() public items_price!: number;
  @IsNumber() public tax_price!: number;
  @IsNumber() public total_price!: number;
  @IsString() public user!: string;
  @IsBoolean() public isPaid!: boolean;
  @IsBoolean() public isDelivered!: boolean;
  @IsDate() public paidAt!: Date;
  @IsDate() public deliveredAt!: Date;
  @IsOptional() public updatedAt?: Date;
  @IsDate() public createdAt!: Date;
  @IsOptional() public payment_result?: PaymentResultDto | string;

  public constructor(order: OrderDto) {
    this.order_items = order.order_items;
    this.shipping_address = order.shipping_address;
    this.shipping_price = order.shipping_price;
    this.payment_method = order.payment_method;
    this.items_price = order.items_price;
    this.tax_price = order.tax_price;
    this.total_price = order.total_price;
    this.user = order.user;
    this.isPaid = order.isPaid;
    this.isDelivered = order.isDelivered;
    this.paidAt = order.paidAt;
    this.deliveredAt = order.deliveredAt;
    if (order.payment_result) {
      this.payment_result = order.payment_result;
    }
    if (order._id) {
      this._id = order._id;
    }
  }
}

export class UpdateOrderDto extends PartialType(OrderDto) {
  id: string;
}
