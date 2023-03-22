import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemDto } from './dto/item.dto';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public quantity: number;

  @Prop({ required: true })
  public price: number;

  @Prop({ required: true })
  public image: string;

  @Prop({ required: true, ref: 'products' })
  public product: Types.ObjectId;

  @Prop()
  public order_id: string;

  public constructor() {
    // * Something hehe
  }

  public hydrate(item: CreateItemDto): ItemDto {
    this.name = item.name;
    this.quantity = item.quantity;
    this.price = item.price;
    this.image = item.image;
    this.product = new Types.ObjectId(item.product);
    if (item.order_id) {
      this.order_id = item.order_id;
    }

    return this;
  }
}

export const ItemSchema = SchemaFactory.createForClass(Item);
