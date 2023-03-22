import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ShippingAddressDto } from './dto/shipping-address.dto';

export type ShippingAddressDocument = ShippingAddress & Document;

@Schema()
export class ShippingAddress {
  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public address: string;

  @Prop({ required: true })
  public city: string;

  @Prop({ required: true })
  public postal_code: number;

  @Prop({ required: true })
  public country: string;

  @Prop()
  public order_id: string;

  public constructor() {
    // * Something hehe
  }

  public hydrate(ShippingAddress: {
    name: string;
    address: string;
    postal_code: number;
    country: string;
    city: string;
    order_id?: string;
  }): ShippingAddressDto {
    this.name = ShippingAddress.name;
    this.address = ShippingAddress.address;
    this.postal_code = ShippingAddress.postal_code;
    this.country = ShippingAddress.country;
    this.city = ShippingAddress.city;
    if (ShippingAddress.order_id) {
      this.order_id = ShippingAddress.order_id;
    }

    return this;
  }
}

export const ShippingAddressSchema =
  SchemaFactory.createForClass(ShippingAddress);
