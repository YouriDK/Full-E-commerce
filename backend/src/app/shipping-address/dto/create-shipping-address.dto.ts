import { Allow, IsNumber, IsString } from 'class-validator';

export class CreateShippingAddressDto {
  @IsString() public name!: string;
  @IsString() public _id?: string;
  @IsString() public address!: string;
  @IsString() public city!: string;
  @IsNumber() public postal_code!: number; // info old name : postalCode to replace in DB
  @IsString() public country!: string;
  @Allow() public order_id?: string;
}
