import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('create')
  public async create(@Body() userDatas: UserDto) {
    console.log('🤞 Controllers -> Create user 🤞');
    return this.usersService.create(userDatas);
  }

  //! Must be admin
  @MessagePattern('findAllUsers')
  @Get('list')
  async findAll() {
    console.log('🤞 Controllers -> Get All users 🤞');
    return await this.usersService.findAll();
  }

  @MessagePattern('findOneUser')
  @Get(':id')
  async findOne(@Param() datas: any) {
    // TODO check le contenu de params
    console.log('🤞 Controllers -> Get One user 🤞');
    return await this.usersService.findOne(datas.id);
  }

  @MessagePattern('updateUser')
  @Put('profile')
  async update(@Request() req: any, @Body() updateUserDto: UserDto) {
    console.log('🤞 Controllers -> Update User 🤞');
    await this.authService.checkUser(
      updateUserDto.email,
      updateUserDto.password,
    );
    const saltOrRounds = 8;
    const password = updateUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    updateUserDto.password = hash;
    return this.usersService.update(req.user._id, updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }
}
