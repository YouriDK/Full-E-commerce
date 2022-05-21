import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ProductDocument = Product & Document;
// export const categories =
//   'Shoes' || 'Shirts' || 'Sweat' || 'Pants' || 'Joggings' || 'Underwears';
export enum categories {
  'Shoes',
  'Shirts',
  'Sweat',
  'Pants',
  'Joggings',
  'Underwears',
}

@Schema()
export class Product {
  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public image: string;

  @Prop({ required: true })
  public brand: string;

  @Prop({ required: true, enum: categories, type: String })
  public category: categories;

  @Prop({ required: true })
  public price: number;

  @Prop({ required: true, default: 0 })
  public countInStock: number;

  @Prop({ required: true })
  public description: string;

  @Prop({ required: true, default: 0 })
  public rating: number;

  @Prop({ required: true, default: 0 })
  public numReviews: number;

  public constructor() {
    // * Something hehe
  }

  public fill(wf: {
    name: string;
    image: string;
    brand: string;
    category: categories;
    price: number;
    countInStock: number;
    description: string;
    rating: number;
    numReviews: number;
  }): any {
    this.name = wf.name;
    this.image = wf.image;
    this.brand = wf.brand;
    this.category = wf.category;
    this.price = wf.price;
    this.countInStock = wf.countInStock;
    this.description = wf.description;
    this.rating = wf.rating;
    this.numReviews = wf.numReviews;
    return this;
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);
