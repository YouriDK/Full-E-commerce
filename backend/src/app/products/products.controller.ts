import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { ProductDto, UpdateProductDto } from './dto/product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('createProduct')
  // ! Must Be admin
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() productDto: ProductDto) {
    console.log('🤞 Controllers -> find all products 🤞');
    return this.productsService.create(productDto);
  }
  @MessagePattern('findOneProduct')
  @Get(':id')
  async findOne(@Param() params: any) {
    console.log('🤞 Controllers -> find the product 🤞');
    return await this.productsService.findOne(params.id);
  }

  @MessagePattern('findAllProducts')
  @Get()
  async findAll() {
    console.log('🤞 Controllers -> find all products 🤞');
    return await this.productsService.findAll();
  }

  @MessagePattern('updateProduct')
  // ! Must Be admin
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Body() updateProductDto: UpdateProductDto) {
    console.log('🤞 Controllers -> Update the product 🤞');
    return this.productsService.update(updateProductDto._id, updateProductDto);
  }

  @MessagePattern('removeProduct')
  remove(@Param() params: any) {
    console.log('🤞 Controllers -> Delete the product 🤞');
    return this.productsService.remove(params.id);
  }
}
