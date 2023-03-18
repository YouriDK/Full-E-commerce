import { IsBoolean, IsString, IsEmail } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { User } from '../user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsString()
  public _id?: string;

  @IsString()
  public name!: string;

  @IsEmail()
  public email!: string;

  @IsString()
  public password!: string;
  @IsBoolean()
  public admin!: boolean;

  public constructor(user: User) {
    // this._id = workflow._id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.admin = user.admin;
  }
}

export class UpdateUserDto extends PartialType(UserDto) {
  id: string;
}
