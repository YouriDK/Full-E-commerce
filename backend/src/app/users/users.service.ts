import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/create-user.dto';
import { User, UserDocument } from './user.schema';
import {
  NoUsersFound,
  UserCreationFailed,
  UserNotFound,
  UserUpdateFailed,
} from './users.error';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private user: Model<UserDocument>,
  ) {}

  async create(userDatas: UserDto): Promise<UserDto> {
    console.log('🤞 Service -> Create User 🤞');
    const user = await new User().fill(userDatas);
    const newUser = new this.user(user);
    if (!newUser) {
      const err = new UserCreationFailed();
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> Create User success ✅');
    return newUser.save();
  }

  async findAll(): Promise<UserDto[]> | null {
    console.log('🤞 Service -> Get all users 🤞');
    const users = await this.user.find();
    if (!users) {
      const err = new NoUsersFound();
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> Get all users success ✅');
    return users;
  }

  async findOnebyEmail(email: string): Promise<UserDto> | null {
    console.log('🤞 Service -> Login user checking email.... 🤞');
    const user = await this.user.findOne({ email: email });
    if (!user) {
      const err = new UserNotFound(email);
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> login user checking email....success ✅');
    return user;
  }
  async findOne(id: string): Promise<UserDto> | null {
    console.log('🤞 Service -> Get a user 🤞');
    const user = await this.user.findOne({ _id: id });
    if (!user) {
      const err = new UserNotFound(id);
      console.log(err);
      throw err;
    }
    console.log('✅ Service -> Get a user success ✅');
    return user;
  }

  async update(id: string, userDatas: UserDto): Promise<UserDto> {
    console.log('🤞 Service -> Update user 🤞');
    const OldUser = await this.findOnebyEmail(userDatas.email);
    if (OldUser) {
      try {
        await this.user.updateOne(
          { _id: id },
          {
            email: userDatas.email ?? OldUser.email,
            password: userDatas.password ?? OldUser.password,
            name: userDatas.name ?? OldUser.name,
          },
        );
      } catch (error: any) {
        const err = new UserUpdateFailed();
        console.log(err);
        throw err;
      }
      console.log('✅ Service -> Update user success ✅');
      return await this.findOnebyEmail(userDatas.email);
    }
  }

  remove(id: number) {
    // TODO implements
    return `This action removes a #${id} user`;
  }
}
