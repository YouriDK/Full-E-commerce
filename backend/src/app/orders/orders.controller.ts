import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Logger,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto, UpdateOrderDto } from './dto/order.dto';
import { OrdersService } from './orders.service';
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  private readonly loggerService = new Logger();
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create an order after a purchase',
  })
  async create(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
    this.loggerService.log('🤞 OrdersController -> Creating order 🤞');
    return await this.ordersService.create({
      user: req.user._id,
      ...createOrderDto,
    });
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get list of all orders',
  })
  async getAll() {
    this.loggerService.log('🤞 OrdersController -> Find all orders 🤞');
    return await this.ordersService.getAll();
  }

  @Get('/mine/:id')
  @ApiResponse({
    status: 200,
    description: 'Get order from user whose logged',
  })
  async findOrdersformUser(@Param() params: any) {
    this.loggerService.log(
      '🤞 OrdersController -> Find all orders from a specific user 🤞',
    );
    return await this.ordersService.findSome(params.id);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get specific order from id',
  })
  async findOne(@Param() params: any) {
    this.loggerService.log('🤞 OrdersController -> Find a order 🤞');
    return await this.ordersService.findOne(params.id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Update specific order from id',
  })
  async update(@Param() params: any, @Body() updateOrderDto: UpdateOrderDto) {
    this.loggerService.log('🤞 OrdersController -> Update order 🤞');
    return await this.ordersService.update(params.id, updateOrderDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete specific order from id',
  })
  async remove(@Param() params: any) {
    this.loggerService.log('🤞 OrdersController -> Delete order 🤞');
    return await this.ordersService.remove(params.id);
  }

  @Post('/pay/:id')
  @ApiResponse({
    status: 200,
    description: 'Change payment status of  a specific order from id',
  })
  async pay(@Param() params: any, @Body() moneyDatas: any, @Req() req: any) {
    this.loggerService.log('🤞 OrdersController -> Pay order 🤞');
    return await this.ordersService.pay(params.id, {
      status: moneyDatas.status,
      email_address: req.user.email,
      order_id: params.id,
      update_time: new Date(Date.now()),
    });
  }

  @Put('/deliver/:id')
  @ApiResponse({
    status: 200,
    description: 'Change deliver status of  a specific order from id',
  })
  async deliver(@Param() params: any) {
    this.loggerService.log('🤞 OrdersController -> Deliver order 🤞');
    return await this.ordersService.deliver(params.id);
  }
  // @Get('/mine')
  // async ownOrder(@Req() params: any) {
  //   this.loggerService.log('🤞 OrdersController -> Deliver order 🤞');
  //   return await this.ordersService.deliver(params.id);
  // }
}
