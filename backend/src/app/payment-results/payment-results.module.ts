import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentResult, PaymentResultSchema } from './payment-results.schema';
import { PaymentResultService } from './payment-results.service';
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentResult.name, schema: PaymentResultSchema },
    ]),
  ],
  providers: [PaymentResultService],
  exports: [PaymentResultService],
})
export class PaymentResultsModule {}
