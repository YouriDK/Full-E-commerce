import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  public name: string;

  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: true })
  public password: string;

  @Prop({ required: true, default: false })
  public admin: boolean;

  public constructor() {
    // * Something hehe
  }

  public hydrate(user: {
    name: string;
    email: string;
    password: string;
    admin: boolean;
  }): any {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.admin = user.admin;
    return this;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
