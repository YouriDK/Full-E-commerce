import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductsService } from './products.service';
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  private readonly loggerService = new Logger();
  constructor(private readonly productsService: ProductsService) {}

  // ! Must Be admin
  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create product in DB',
  })
  create(@Body() productDto: ProductDto) {
    this.loggerService.log('🤞 ProductsController -> create a product 🤞');
    return this.productsService.create(productDto);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get specific product from id',
  })
  async findOne(@Param() params: any) {
    this.loggerService.log('🤞 ProductsController -> find the product 🤞');
    return await this.productsService.findOne(params.id);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get list of products',
  })
  async findAll() {
    this.loggerService.log('🤞 ProductsController -> find all products 🤞');
    return await this.productsService.findAll();
  }

  // ! Must Be admin
  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Update specific product from id',
  })
  update(@Body() updateProductDto: UpdateProductDto) {
    this.loggerService.log('🤞 ProductsController -> Update the product 🤞');
    return this.productsService.update(updateProductDto._id, updateProductDto);
  }
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete specific product from id',
  })
  remove(@Param() params: any) {
    this.loggerService.log('🤞 ProductsController -> Delete the product 🤞');
    return this.productsService.remove(params.id);
  }
}
