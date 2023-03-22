import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDto, UpdateProductDto } from './dto/product.dto';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import {
  CreationProductFailed,
  ProductListNotFound,
  ProductNotFound,
  UpdateProductFailed,
} from './products-errors';

@Injectable()
export class ProductsService {
  private readonly loggerService = new Logger();
  constructor(
    @InjectModel(Product.name)
    private product: Model<ProductDocument>,
  ) {}
  async create(ProductDto: ProductDto): Promise<ProductDto> {
    this.loggerService.log('⚒ Service -> Create product ⚒');
    const product = await new Product().hydrate(ProductDto);
    const newProduct = new this.product(product);
    if (!newProduct) {
      throw new CreationProductFailed();
    }
    this.loggerService.log('✅ Service -> Create product success ✅');
    return newProduct.save();
  }

  async findAll() {
    this.loggerService.log('⚒ Service -> Get all Product ⚒');
    const products = await this.product.find();
    if (!products) {
      throw new ProductListNotFound();
    }
    this.loggerService.log('✅ Service -> Get all Product success ✅');
    return products;
  }

  async findOne(id: string) {
    this.loggerService.log('⚒ Service -> Get a Product ⚒');
    const product = await this.product.findOne({ _id: id });
    if (!product) {
      throw new ProductNotFound(id);
    }
    this.loggerService.log('✅ Service -> Get a Product success ✅');
    return product;
  }

  async update(id: string, ProductDto: UpdateProductDto) {
    this.loggerService.log('⚒ Service -> update a Product ⚒');
    const product = await this.product.findOne({ _id: id });
    if (!product) {
      throw new ProductNotFound(id);
    }
    try {
      await this.product.updateOne(
        { _id: id },
        {
          name: ProductDto.name ?? product.name,
          image: ProductDto.image ?? product.image,
          brand: ProductDto.brand ?? product.brand,
          category: ProductDto.category ?? product.category,
          price: ProductDto.price ?? product.price,
          countInStock: ProductDto.countInStock ?? product.countInStock,
          description: ProductDto.description ?? product.description,
          rating: ProductDto.rating ?? product.rating,
          numReviews: ProductDto.numReviews ?? product.numReviews,
        },
      );
    } catch (error) {
      throw new UpdateProductFailed(id);
    }
    this.loggerService.log('✅ Service -> update a Product success ✅');
    return await this.product.findById(id);
  }

  async remove(id: string) {
    this.loggerService.log('⚒ Service -> Delete a Product ⚒');
    const product = await this.product.deleteOne({ _id: id });
    // TODO do a check to throw new if needed
    this.loggerService.log('✅ Service -> Delete a Product success ✅');
    return product;
  }
}
