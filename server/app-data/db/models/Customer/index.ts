import mongoose, { Document } from 'mongoose';

export interface ICustomer extends Document {
  customerPoints?: number;
  email: string;
  tel: string;
  firstName: string;
  isVerified: boolean;
  lastName: string;
  marketing: boolean;
  password: string;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
  role?: number;
}

const CustomerSchema = new mongoose.Schema({
  customerPoints: {
    default: 0,
    type: Number,
  },
  email: String,
  tel: String,
  isVerified: {
    default: false,
    type: Boolean,
  },
  firstName: String,
  marketing: {
    default: false,
    type: Boolean,
  },
  lastName: String,
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  role: {
    default: 1,
    type: Number,
  },
});

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
