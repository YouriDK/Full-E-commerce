import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentResult, PaymentResultSchema } from './payment-results.schema';
import { PaymentResultService } from './payment-results.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentResult.name, schema: PaymentResultSchema },
    ]),
  ],
  providers: [PaymentResultService],
})
export class PaymentResultsModule {}
