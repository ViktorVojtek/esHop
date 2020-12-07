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
  companyDTAXNum?: string;
  companyDVATNum?: string;
  companyName?: string;
  companyVatNum?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  state?: string;
  optionalAddress?: string;
  optionalCity?: string;
  optionalPostalCode?: string;
  optionalState?: string;
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
  companyDTAXNum: String,
  companyDVATNum: String,
  companyName: String,
  companyVatNum: String,
  address: String,
  city: String,
  postalCode: String,
  state: String,
  optionalAddress: String,
  optionalCity: String,
  optionalPostalCode: String,
  optionalState: String,
});

export default mongoose.model<ICustomer>('Customer', CustomerSchema);
