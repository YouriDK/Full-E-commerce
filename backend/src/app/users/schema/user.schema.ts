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

  public fill(wf: {
    name: string;
    email: string;
    password: string;
    admin: boolean;
  }): any {
    this.name = wf.name;
    this.email = wf.email;
    this.password = wf.password;
    this.admin = wf.admin;
    return this;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
