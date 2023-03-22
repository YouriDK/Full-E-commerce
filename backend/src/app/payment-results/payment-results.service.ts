import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentResultDto } from './dto/create-payment-result.dto';
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
import { PaymentResult, PaymentResultDocument } from './payment-results.schema';
@Injectable()
export class PaymentResultService {
  private readonly loggerService = new Logger();
  constructor(
    @InjectModel(PaymentResult.name)
    private paymentResult: Model<PaymentResultDocument>,
  ) {}

  async create(
    PaymentResultDto: CreatePaymentResultDto,
  ): Promise<PaymentResultDto> {
    this.loggerService.log('⚒ PaymentResultService -> Create PaymentResult ⚒');
    const paymentResult = new PaymentResult().hydrate(PaymentResultDto);
    const newPaymentResult = new this.paymentResult(paymentResult);
    if (!newPaymentResult) {
      throw new CreationPaymentResultFailed();
    }
    this.loggerService.log(
      '✅ PaymentResultService -> Create PaymentResult success ✅',
    );
    return newPaymentResult.save();
  }

  async findAll() {
    this.loggerService.log('⚒ PaymentResultService -> Get all PaymentResult ⚒');
    const paymentResults = await this.paymentResult.find();
    if (!paymentResults) {
      throw new PaymentResultListNotFound();
    }
    this.loggerService.log(
      '✅ PaymentResultService -> Get all PaymentResult success ✅',
    );
    return paymentResults;
  }

  async findOne(id: string) {
    this.loggerService.log('⚒ PaymentResultService -> Get a PaymentResult ⚒');
    const paymentResult = await this.paymentResult.findOne({ _id: id });
    if (!paymentResult) {
      throw new PaymentResultNotFound(id);
    }
    this.loggerService.log(
      '✅ PaymentResultService -> Get a PaymentResult success ✅',
    );
    return paymentResult;
  }

  async update(id: string, PaymentResultDto: UpdatePaymentResultDto) {
    this.loggerService.log(
      '⚒ PaymentResultService -> update a PaymentResult ⚒',
    );
    const paymentResult = await this.paymentResult.findOne({ _id: id });
    if (!paymentResult) {
      throw new PaymentResultNotFound(id);
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
      throw new UpdatePaymentResultFailed(id);
    }
    this.loggerService.log(
      '✅ PaymentResultService -> update a PaymentResult success ✅',
    );
    return await this.paymentResult.findById(id);
  }

  async remove(id: string) {
    this.loggerService.log(
      '⚒ PaymentResultService -> Delete a PaymentResult ⚒',
    );
    const paymentResult = await this.paymentResult.deleteOne({ _id: id });
    // TODO do a check to throw new if needed
    this.loggerService.log(
      '✅ PaymentResultService -> Delete a PaymentResult success ✅',
    );
    return paymentResult;
  }
}
