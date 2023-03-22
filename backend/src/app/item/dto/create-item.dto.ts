import { Allow, IsNumber, IsString } from 'class-validator';
export class CreateItemDto {
  @IsString() public _id?: string;
  @IsString() public name!: string;
  @IsNumber() public quantity!: number; // info Old name : qty to replace in DB
  @IsNumber() public price!: number;
  @IsString() public image!: string;
  @IsString() public product!: string;
  @Allow() public order_id?: string;
}
