import { Module, Global } from '@nestjs/common';
import {
  ShippingAddress,
  ShippingAddressSchema,
} from './shipping-address.schema';
import { ShippingAddressService } from './shipping-address.service';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ShippingAddress.name, schema: ShippingAddressSchema },
    ]),
  ],
  providers: [ShippingAddressService],
  exports: [ShippingAddressService],
})
export class ShippingAddressModule {}
