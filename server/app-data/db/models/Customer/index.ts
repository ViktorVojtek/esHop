import mongoose, { Document } from 'mongoose';

export interface ICustomer extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: number;
}

const CustomerSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  role: {
    default: 1,
    type: Number,
  },
});

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
