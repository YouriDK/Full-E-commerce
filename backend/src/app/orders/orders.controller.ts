import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderDto, UpdateOrderDto } from './dto/order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: OrderDto) {
    console.log('🤞 Controllers -> Create orders 🤞');
    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll() {
    console.log('🤞 Controllers -> Find all orders 🤞Params');
    return await this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: any) {
    console.log('🤞 Controllers -> Find a order 🤞');
    return await this.ordersService.findOne(params.id);
  }

  @Patch(':id')
  async update(@Param() params: any, @Body() updateOrderDto: UpdateOrderDto) {
    console.log('🤞 Controllers -> Update order 🤞');
    return await this.ordersService.update(params.id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param() params: any) {
    console.log('🤞 Controllers -> Delete order 🤞');
    return await this.ordersService.remove(params.id);
  }

  @Patch('/pay/:id')
  async pay(@Param() params: any, @Body() moneyDatas: UpdateOrderDto) {
    console.log('🤞 Controllers -> Pay order 🤞');
    return await this.ordersService.pay(params.id, moneyDatas);
  }

  @Patch('/deliver/:id')
  async deliver(@Param() params: any) {
    console.log('🤞 Controllers -> Deliver order 🤞');
    return await this.ordersService.deliver(params.id);
  }
  // @Get('/mine')
  // async ownOrder(@Req() params: any) {
  //   console.log('🤞 Controllers -> Deliver order 🤞');
  //   return await this.ordersService.deliver(params.id);
  // }
}
