import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from './item.schema';
import { Model } from 'mongoose';
import { ItemDto, UpdateItemDto } from './dto/item.dto';
import {
  CreationItemFailed,
  ItemListNotFound,
  ItemNotFound,
  UpdateItemFailed,
} from './item.error';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name)
    private item: Model<ItemDocument>,
  ) {}
  async create(ItemDto: ItemDto): Promise<ItemDto> {
    console.log('⚜ Service -> Create Item ⚜');
    const item = new Item().fill(ItemDto);
    const newItem = new this.item(item);
    if (!newItem) {
      const err = new CreationItemFailed();
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> Create Item success ✅');
    return newItem.save();
  }

  async findAll() {
    console.log('⚜ Service -> Item all Item ⚜');
    const items = await this.item.find();
    if (!items) {
      const err = new ItemListNotFound();
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> Find all Item success ✅');
    return items;
  }

  async findOne(id: string) {
    console.log('⚜ Service -> Find a Item ⚜');
    const Item = await this.item.findOne({ _id: id });
    if (!Item) {
      const err = new ItemNotFound(id);
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> Find a Item success ✅');
    return Item;
  }

  async update(id: string, ItemDto: UpdateItemDto) {
    console.log('⚜ Service -> update a Item ⚜');
    const item = await this.item.findOne({ _id: id });
    if (!item) {
      const err = new ItemNotFound(id);
      console.log(err);
      throw err;
    }
    try {
      await this.item.updateOne(
        { _id: id },
        {
          name: ItemDto.name ?? item.name,
          price: ItemDto.price ?? item.price,
          quantity: ItemDto.quantity ?? item.quantity,
          image: ItemDto.image ?? item.image,
          product: ItemDto.product ?? item.product,
          order_id: ItemDto.order_id ?? item.order_id,
        },
      );
    } catch (error) {
      const err = new UpdateItemFailed(id);
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> update a Item success ✅');
    return await this.item.findById(id);
  }

  async remove(id: string) {
    console.log('⚜ Service -> Delete a Item ⚜');
    const item = await this.item.deleteOne({ _id: id });
    // TODO do a check to throw new if needed
    console.log('✅ Service -> Delete a Item success ✅');
    return item;
  }
}
