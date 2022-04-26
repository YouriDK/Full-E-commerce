import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ItemDto } from './dto/item.dto';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public quantity: number;

  @Prop({ required: true })
  public image: string;

  @Prop({ required: true })
  public product: string;

  @Prop()
  public order_id: string;

  public constructor() {
    // * Something hehe
  }

  public fill(item: {
    name: string;
    quantity: number;
    image: string;
    product: string;
    order_id?: string;
  }): ItemDto {
    this.name = item.name;
    this.quantity = item.quantity;
    this.image = item.image;
    this.product = item.product;
    if (item.order_id) {
      this.order_id = item.order_id;
    }

    return this;
  }
}

export const ItemSchema = SchemaFactory.createForClass(Item);
