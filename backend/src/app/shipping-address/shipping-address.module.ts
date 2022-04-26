import { Module } from '@nestjs/common';
import {
  ShippingAddress,
  ShippingAddressSchema,
} from './shipping-address.schema';
import { ShippingAddressService } from './shipping-address.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShippingAddress.name, schema: ShippingAddressSchema },
    ]),
  ],
  providers: [ShippingAddressService],
})
export class ShippingAddressModule {}
