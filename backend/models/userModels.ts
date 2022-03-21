import mongoose, { Document } from 'mongoose';

export interface Iuser {
  // id: any;
  name: string;
  email: string;
  password: string;
  admin: boolean;
}
export interface IuserDocument extends Iuser, Document {
  _id: any;
}
const userSchema = new mongoose.Schema<IuserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false },
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
