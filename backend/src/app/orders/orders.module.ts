import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemModule } from '../item/item.module';
import { ItemSchema } from '../item/item.schema';
import { PaymentResultSchema } from '../payment-results/payment-results.schema';
import { ShippingAddressSchema } from '../shipping-address/shipping-address.schema';
import { UsersModule } from '../users/users.module';
import { Order, OrderSchema } from './order.schema';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),

    MongooseModule.forFeature([
      { name: 'shippingaddresses', schema: ShippingAddressSchema },
    ]),
    MongooseModule.forFeature([{ name: 'items', schema: ItemSchema }]),
    MongooseModule.forFeature([
      { name: 'paymentresults', schema: PaymentResultSchema },
    ]),
    ItemModule,
    UsersModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
