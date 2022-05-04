import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from 'src/auth/google-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // ! Must Be admin
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() productDto: ProductDto) {
    console.log('🤞 Controllers -> find all products 🤞');
    return this.productsService.create(productDto);
  }

  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Body() updateProductDto: UpdateProductDto) {
    console.log('🤞 Controllers -> Update the product 🤞');
    return this.productsService.update(updateProductDto._id, updateProductDto);
  }

  remove(@Param() params: any) {
    console.log('🤞 Controllers -> Delete the product 🤞');
    return this.productsService.remove(params.id);
  }
}
