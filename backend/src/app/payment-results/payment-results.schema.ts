import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PaymentResultDto } from './dto/payment-result.dto';

export type PaymentResultDocument = PaymentResult & Document;

@Schema()
export class PaymentResult {
  @Prop({ required: true })
  public email_address: string;

  @Prop({ required: true })
  public status: string;

  @Prop({ required: true })
  public update_time: Date;

  @Prop()
  public order_id?: Types.ObjectId;

  public constructor() {
    // * Something hehe
  }

  public hydrate(PaymentResult: {
    email_address: string;
    update_time: Date;
    status: string;
    order_id?: string;
  }): PaymentResultDto {
    this.email_address = PaymentResult.email_address;
    this.status = PaymentResult.status;
    this.update_time = PaymentResult.update_time;
    if (PaymentResult.order_id) {
      this.order_id = new Types.ObjectId(PaymentResult.order_id);
    }

    return this;
  }
}

export const PaymentResultSchema = SchemaFactory.createForClass(PaymentResult);
