import { PartialType } from '@nestjs/mapped-types';
import { Allow, IsNumber, IsString } from 'class-validator';

export class ItemDto {
  @IsString() public _id?: string;
  @IsString() public name!: string;
  @IsNumber() public quantity!: number; // info Old name : qty to replace in DB
  @IsString() public image!: string;
  @IsString() public product!: string;
  @Allow() public order_id?: string;

  public constructor(item: ItemDto) {
    // this._id = workflow._id;
    if (item._id) {
      this._id = item._id;
    }
    this.name = item.name;
    this.image = item.image;
    this.quantity = item.quantity;
    this.product = item.product;
    if (item.order_id) {
      this.order_id = item.order_id;
    }
  }
}

export class UpdateItemDto extends PartialType(ItemDto) {
  id?: string;
}