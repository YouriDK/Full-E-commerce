import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateItemDto } from '../../item/dto/create-item.dto';
import { CreateShippingAddressDto } from '../../shipping-address/dto/create-shipping-address.dto';

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
export class CreateOrderDto {
  @IsOptional() public _id?: string;
  @IsNotEmpty() public order_items: CreateItemDto[];
  @IsNotEmpty() public shipping_address!: CreateShippingAddressDto;
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
  @IsOptional() public payment_result?: string;
}
