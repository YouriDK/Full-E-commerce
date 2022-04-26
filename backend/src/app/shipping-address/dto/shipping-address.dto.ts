import { Allow, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class ShippingAddressDto {
  @IsString() public name!: string;
  @IsString() public _id?: string;
  @IsString() public address!: string;
  @IsString() public city!: string;
  @IsNumber() public postal_code!: number; // info old name : postalCode to replace in DB
  @IsString() public country!: string;
  @Allow() public order_id?: string;

  public constructor(ShippingAddress: ShippingAddressDto) {
    this.name = ShippingAddress.name;
    this.address = ShippingAddress.address;
    this.city = ShippingAddress.city;
    this.postal_code = ShippingAddress.postal_code;
    this.country = ShippingAddress.country;
    if (ShippingAddress.order_id) {
      this.order_id = ShippingAddress.order_id;
    }
    if (ShippingAddress._id) {
      this._id = ShippingAddress._id;
    }
  }
}

export class UpdateShippingAddressDto extends PartialType(ShippingAddressDto) {}
