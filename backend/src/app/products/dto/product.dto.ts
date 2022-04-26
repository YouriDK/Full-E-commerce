import { IsBoolean, IsString, IsEmail } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { categories, Product } from '../product.schema';
export class ProductDto {
  @IsString() public _id!: string;
  @IsString() public name!: string;
  @IsString() public image!: string;
  @IsEmail() public brand!: string;
  @IsString() public category!: categories;
  @IsBoolean() public price!: number;
  @IsBoolean() public countInStock!: number;
  @IsBoolean() public description!: string;
  @IsBoolean() public rating!: number;
  @IsBoolean() public numReviews!: number;

  public constructor(product: Product) {
    // this._id = workflow._id;
    this.name = product.name;
    this.image = product.image;
    this.brand = product.brand;
    this.category = product.category;
    this.price = product.price;
    this.countInStock = product.countInStock;
    this.description = product.description;
    this.rating = product.rating;
    this.numReviews = product.numReviews;
  }
}

export class UpdateProductDto extends PartialType(ProductDto) {
  id: string;
}
