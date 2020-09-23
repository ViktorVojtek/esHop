import mongoose, { Document } from 'mongoose';

export interface ICustomer extends Document {
  customerPoints?: number;
  email: string;
  tel: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: number;
}

const CustomerSchema = new mongoose.Schema({
  customerPoints: {
    default: 0,
    type: Number,
  },
  email: String,
  tel: String,
  firstName: String,
  lastName: String,
  password: String,
  role: {
    default: 1,
    type: Number,
  },
});

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
