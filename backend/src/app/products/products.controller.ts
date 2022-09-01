import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // ! Must Be admin
  @Post()
  create(@Body() productDto: ProductDto) {
    console.log('🤞 Controllers -> create a product 🤞');
    return this.productsService.create(productDto);
  }

  @Get(':id')
  async findOne(@Param() params: any) {
    console.log('🤞 Controllers -> find the product 🤞');
    return await this.productsService.findOne(params.id);
  }

  @Get()
  async findAll() {
    console.log('🤞 Controllers -> find all products 🤞');
    return await this.productsService.findAll();
  }

  // ! Must Be admin
  @Put(':id')
  update(@Body() updateProductDto: UpdateProductDto) {
    console.log('🤞 Controllers -> Update the product 🤞');
    return this.productsService.update(updateProductDto._id, updateProductDto);
  }
  @Delete(':id')
  remove(@Param() params: any) {
    console.log('🤞 Controllers -> Delete the product 🤞');
    return this.productsService.remove(params.id);
  }
}
