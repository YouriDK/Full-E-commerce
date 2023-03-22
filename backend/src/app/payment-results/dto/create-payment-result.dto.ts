import { PartialType } from '@nestjs/mapped-types';
import { Allow, IsDate, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePaymentResultDto {
  @IsOptional() public _id?: string;
  @IsString() public email_address!: string; // * Id of the person who paid
  @IsString() public status!: string;
  @IsDate() public update_time!: Date;
  @Allow() public order_id?: string;
}
