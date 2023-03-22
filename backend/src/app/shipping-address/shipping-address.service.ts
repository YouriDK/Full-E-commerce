import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ShippingAddressDto,
  UpdateShippingAddressDto,
} from './dto/shipping-address.dto';
import {
  CreationShippingAddressFailed,
  ShippingAddressListNotFound,
  ShippingAddressNotFound,
  UpdateShippingAddressFailed,
} from './shipping-address.errors';
import {
  ShippingAddress,
  ShippingAddressDocument,
} from './shipping-address.schema';

@Injectable()
export class ShippingAddressService {
  private readonly loggerService = new Logger();
  constructor(
    @InjectModel(ShippingAddress.name)
    private shippingAddress: Model<ShippingAddressDocument>,
  ) {}

  async create(
    ShippingAddressDto: ShippingAddressDto,
  ): Promise<ShippingAddressDto> {
    this.loggerService.log('⚒ Service -> Create ShippingAddress ⚒');
    const shippingAddress = new ShippingAddress().hydrate(ShippingAddressDto);
    const newShippingAddress = new this.shippingAddress(shippingAddress);
    if (!newShippingAddress) {
      const err = new CreationShippingAddressFailed();
      this.loggerService.log(err);
      throw err;
    }
    const newShippingAddressSaved = newShippingAddress.save();
    this.loggerService.log('✅ Service -> Create ShippingAddress success ✅');
    return newShippingAddressSaved;
  }

  async getAll() {
    this.loggerService.log('⚒ Service -> Get all ShippingAddress ⚒');
    const shippingAddresss = await this.shippingAddress.find();
    if (!shippingAddresss) {
      const err = new ShippingAddressListNotFound();
      this.loggerService.log(err);
      throw err;
    }
    this.loggerService.log('✅ Service -> Get all ShippingAddress success ✅');
    return shippingAddresss;
  }

  async findOne(id: string) {
    this.loggerService.log('⚒ Service -> Get a ShippingAddress ⚒');
    const shippingAddress = await this.shippingAddress.findOne({ _id: id });
    if (!shippingAddress) {
      const err = new ShippingAddressNotFound(id);
      this.loggerService.log(err);
      throw err;
    }
    this.loggerService.log('✅ Service -> Get a ShippingAddress success ✅');
    return shippingAddress;
  }

  async update(id: string, shippingAddressDto: UpdateShippingAddressDto) {
    this.loggerService.log('⚒ Service -> update a ShippingAddress ⚒');
    const shippingAddress = await this.shippingAddress.findOne({ _id: id });
    if (!shippingAddress) {
      const err = new ShippingAddressNotFound(id);
      this.loggerService.log(err);
      throw err;
    }
    try {
      await this.shippingAddress.updateOne(
        { _id: id },
        {
          name: shippingAddressDto.name ?? shippingAddress.name,
          address: shippingAddressDto.address ?? shippingAddress.address,
          city: shippingAddressDto.city ?? shippingAddress.city,
          postal_code:
            shippingAddressDto.postal_code ?? shippingAddress.postal_code,
          country: shippingAddressDto.country ?? shippingAddress.country,
          order_id: shippingAddressDto.order_id ?? shippingAddress.order_id,
        },
      );
    } catch (error) {
      const err = new UpdateShippingAddressFailed(id);
      this.loggerService.log(err);
      throw err;
    }
    this.loggerService.log('✅ Service -> update a ShippingAddress success ✅');
    return await this.shippingAddress.findById(id);
  }

  async remove(id: string): Promise<void> {
    this.loggerService.log('⚒ Service -> Delete a ShippingAddress ⚒');
    const shippingAddress = await this.shippingAddress.deleteOne({ _id: id });
    // TODO do a check to throw new if needed
    this.loggerService.log('✅ Service -> Delete a ShippingAddress success ✅');
    // return shippingAddress;
  }
}
