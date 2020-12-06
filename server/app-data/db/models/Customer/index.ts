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
  company?: Object;
  billingAddress?: Object;
  deliveryAddress?: Object;
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
  company: {
    ico: {
      default: '',
      type: String,
    },
    dic: {
      default: '',
      type: String,
    },
    icdph: {
      default: '',
      type: String,
    },
  },
  billingAddress: {
    address: {
      default: '',
      type: String,
    },
    city: {
      default: '',
      type: String,
    },
    postalCode: {
      default: '',
      type: String,
    },
    state: {
      default: '',
      type: String,
    },
  },
  deliveryAddress: {
    address: {
      default: '',
      type: String,
    },
    city: {
      default: '',
      type: String,
    },
    postalCode: {
      default: '',
      type: String,
    },
    state: {
      default: '',
      type: String,
    },
  },
});

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
