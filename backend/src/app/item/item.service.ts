import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemDto, UpdateItemDto } from './dto/item.dto';
import {
  CreationItemFailed,
  ItemListNotFound,
  ItemNotFound,
  UpdateItemFailed,
} from './item.error';
import { Item, ItemDocument } from './item.schema';

@Injectable()
export class ItemService {
  private readonly loggerService = new Logger();
  constructor(
    @InjectModel(Item.name)
    private itemDocument: Model<ItemDocument>,
  ) {}
  async create(ItemDto: CreateItemDto): Promise<ItemDto> {
    this.loggerService.log('⚒ ItemService -> Creating Item ⚒');
    const item = new Item().hydrate(ItemDto);
    const newItem = new this.itemDocument(item);
    const newItemSaved = await newItem.save();
    if (!newItem) {
      throw new CreationItemFailed();
    }
    this.loggerService.log('✅ ItemService -> Create Item success ✅');
    return newItemSaved;
  }

  async getAll() {
    this.loggerService.log('⚒ ItemService -> Item all Item ⚒');
    const items = await this.itemDocument.find().populate('products');
    if (!items) {
      throw new ItemListNotFound();
    }
    this.loggerService.log('✅ ItemService -> Find all Item success ✅');
    return items;
  }

  async findOne(id: string) {
    this.loggerService.log('⚒ ItemService -> Find a Item ⚒');
    const item = await this.itemDocument
      .findOne({ _id: id })
      .populate('products');
    if (!item) {
      throw new ItemNotFound(id);
    }
    this.loggerService.log('✅ ItemService -> Find a Item success ✅');
    return item;
  }

  async update(id: string, ItemDto: UpdateItemDto) {
    this.loggerService.log('⚒ ItemService -> updating an Item ⚒');
    const item = await this.itemDocument.findOne({ _id: id });
    if (!item) {
      throw new ItemNotFound(id);
    }
    try {
      await this.itemDocument.updateOne(
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
      throw new UpdateItemFailed(id);
    }
    this.loggerService.log('✅ ItemService -> Item updated✅');
    return await this.itemDocument.findById(id);
  }

  async remove(id: string) {
    this.loggerService.log('⚒ ItemService -> Delete a Item ⚒');
    const item = await this.itemDocument.deleteOne({ _id: id });
    // TODO do a check to throw new if needed
    this.loggerService.log('✅ ItemService -> Delete a Item success ✅');
    return item;
  }
  // ! Pas sur !
  async removeSome(id: string[]): Promise<void> {
    this.loggerService.log('⚒ ItemService -> Delete a Item ⚒');
    const item = await this.itemDocument.deleteMany({ _id: id });
    // TODO do a check to throw new if needed
    this.loggerService.log('✅ ItemService -> Delete a Item success ✅');
  }
}
