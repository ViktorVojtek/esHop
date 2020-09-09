import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  admin: boolean;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: number;
}

const UserSchema = new mongoose.Schema({
  admin: {
    default: false,
    type: Boolean,
  },
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  role: {
    default: 1,
    type: Number,
  },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
