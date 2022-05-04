import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaymentResult, PaymentResultDocument } from './payment-results.schema';
import { Model } from 'mongoose';
import {
  PaymentResultDto,
  UpdatePaymentResultDto,
} from './dto/payment-result.dto';
import {
  CreationPaymentResultFailed,
  PaymentResultListNotFound,
  PaymentResultNotFound,
  UpdatePaymentResultFailed,
} from './payment-result.error';
@Injectable()
export class PaymentResultService {
  constructor(
    @InjectModel(PaymentResult.name)
    private paymentResult: Model<PaymentResultDocument>,
  ) {}

  async create(PaymentResultDto: PaymentResultDto): Promise<PaymentResultDto> {
    console.log('⚜ Service -> Create PaymentResult ⚜');
    const paymentResult = await new PaymentResult().fill(PaymentResultDto);
    const newPaymentResult = new this.paymentResult(paymentResult);
    if (!newPaymentResult) {
      const err = new CreationPaymentResultFailed();
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> Create PaymentResult success ✅');
    return newPaymentResult.save();
  }

  async findAll() {
    console.log('⚜ Service -> Get all PaymentResult ⚜');
    const paymentResults = await this.paymentResult.find();
    if (!paymentResults) {
      const err = new PaymentResultListNotFound();
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> Get all PaymentResult success ✅');
    return paymentResults;
  }

  async findOne(id: string) {
    console.log('⚜ Service -> Get a PaymentResult ⚜');
    const paymentResult = await this.paymentResult.findOne({ _id: id });
    if (!paymentResult) {
      const err = new PaymentResultNotFound(id);
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> Get a PaymentResult success ✅');
    return paymentResult;
  }

  async update(id: string, PaymentResultDto: UpdatePaymentResultDto) {
    console.log('⚜ Service -> update a PaymentResult ⚜');
    const paymentResult = await this.paymentResult.findOne({ _id: id });
    if (!paymentResult) {
      const err = new PaymentResultNotFound(id);
      console.log(err);
      throw err;
    }
    try {
      await this.paymentResult.updateOne(
        { _id: id },
        {
          email_address: PaymentResultDto.email_address,
          status: PaymentResultDto.status,
          update_time: PaymentResultDto.update_time,
        },
      );
    } catch (error) {
      const err = new UpdatePaymentResultFailed(id);
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> update a PaymentResult success ✅');
    return await this.paymentResult.findById(id);
  }

  async remove(id: string) {
    console.log('⚜ Service -> Delete a PaymentResult ⚜');
    const paymentResult = await this.paymentResult.deleteOne({ _id: id });
    // TODO do a check to throw new if needed
    console.log('✅ Service -> Delete a PaymentResult success ✅');
    return paymentResult;
  }
}
