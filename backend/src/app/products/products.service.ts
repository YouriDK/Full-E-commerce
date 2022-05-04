import { Injectable } from '@nestjs/common';
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
  constructor(
    @InjectModel(Product.name)
    private product: Model<ProductDocument>,
  ) {}
  async create(ProductDto: ProductDto): Promise<ProductDto> {
    console.log('⚜ Service -> Create product ⚜');
    const product = await new Product().fill(ProductDto);
    const newProduct = new this.product(product);
    if (!newProduct) {
      const err = new CreationProductFailed();
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> Create product success ✅');
    return newProduct.save();
  }

  async findAll() {
    console.log('⚜ Service -> Get all Product ⚜');
    const products = await this.product.find();
    if (!products) {
      const err = new ProductListNotFound();
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> Get all Product success ✅');
    return products;
  }

  async findOne(id: string) {
    console.log('⚜ Service -> Get a Product ⚜');
    const product = await this.product.findOne({ _id: id });
    if (!product) {
      const err = new ProductNotFound(id);
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> Get a Product success ✅');
    return product;
  }

  async update(id: string, ProductDto: UpdateProductDto) {
    console.log('⚜ Service -> update a Product ⚜');
    const product = await this.product.findOne({ _id: id });
    if (!product) {
      const err = new ProductNotFound(id);
      console.log(err);
      throw err;
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
      const err = new UpdateProductFailed(id);
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> update a Product success ✅');
    return await this.product.findById(id);
  }

  async remove(id: string) {
    console.log('⚜ Service -> Delete a Product ⚜');
    const product = await this.product.deleteOne({ _id: id });
    // TODO do a check to throw new if needed
    console.log('✅ Service -> Delete a Product success ✅');
    return product;
  }
}
