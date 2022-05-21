import { PartialType } from '@nestjs/mapped-types';
import { Allow, IsDate, IsOptional, IsString } from 'class-validator';

export class PaymentResultDto {
  @IsOptional() public _id?: string;
  @IsString() public email_address!: string; // * Id of the person who paid
  @IsString() public status!: string;
  @IsDate() public update_time!: Date;
  @Allow() public order_id?: string;

  public constructor(PaymentResult: PaymentResultDto) {
    this.email_address = PaymentResult.email_address;
    this.status = PaymentResult.status;
    this.update_time = PaymentResult.update_time;
    if (PaymentResult.order_id) {
      this.order_id = PaymentResult.order_id;
    }
    if (PaymentResult._id) {
      this._id = PaymentResult._id;
    }
  }
}
export class UpdatePaymentResultDto extends PartialType(PaymentResultDto) {
  id: string;
}
