import { Injectable } from '@nestjs/common';
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
  constructor(
    @InjectModel(ShippingAddress.name)
    private shippingAddress: Model<ShippingAddressDocument>,
  ) {}

  async create(
    ShippingAddressDto: ShippingAddressDto,
  ): Promise<ShippingAddressDto> {
    console.log('⚜ Service -> Create ShippingAddress ⚜');
    const shippingAddress = new ShippingAddress().fill(ShippingAddressDto);
    const newShippingAddress = new this.shippingAddress(shippingAddress);
    if (!newShippingAddress) {
      const err = new CreationShippingAddressFailed();
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> Create ShippingAddress success ✅');
    return newShippingAddress;
  }

  async findAll() {
    console.log('⚜ Service -> Get all ShippingAddress ⚜');
    const shippingAddresss = await this.shippingAddress.find();
    if (!shippingAddresss) {
      const err = new ShippingAddressListNotFound();
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> Get all ShippingAddress success ✅');
    return shippingAddresss;
  }

  async findOne(id: string) {
    console.log('⚜ Service -> Get a ShippingAddress ⚜');
    const shippingAddress = await this.shippingAddress.findOne({ _id: id });
    if (!shippingAddress) {
      const err = new ShippingAddressNotFound(id);
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> Get a ShippingAddress success ✅');
    return shippingAddress;
  }

  async update(id: string, shippingAddressDto: UpdateShippingAddressDto) {
    console.log('⚜ Service -> update a ShippingAddress ⚜');
    const shippingAddress = await this.shippingAddress.findOne({ _id: id });
    if (!shippingAddress) {
      const err = new ShippingAddressNotFound(id);
      console.log(err);
      throw err;
    }
    try {
      await this.shippingAddress.updateOne(
        { _id: id },
        {
          name: shippingAddressDto.name,
          address: shippingAddressDto.address,
          city: shippingAddressDto.city,
          postal_code: shippingAddressDto.postal_code,
          country: shippingAddressDto.country,
        },
      );
    } catch (error) {
      const err = new UpdateShippingAddressFailed(id);
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> update a ShippingAddress success ✅');
    return await this.shippingAddress.findById(id);
  }

  async remove(id: string) {
    console.log('⚜ Service -> Delete a ShippingAddress ⚜');
    const shippingAddress = await this.shippingAddress.deleteOne({ _id: id });
    // TODO do a check to throw new if needed
    console.log('✅ Service -> Delete a ShippingAddress success ✅');
    return shippingAddress;
  }
}
