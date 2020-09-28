import mongoose, { Document } from 'mongoose';

export interface IOrder extends Document {
  userId?: string;
  address: string;
  city: string;
  created_at: Date;
  companyDVATNum: string;
  companyName: string;
  companyVatNum: string;
  deliveryMethode: string;
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  optionalAddress: string;
  optionalCity: string;
  optionalPostalCode: string;
  paymentMethode: string;
  phone: string;
  postalCode: string;
  state: string;
  status: number;
  totalPrice: number;
  orderId: string;
  products: any[];
}

const OrderSchema = new mongoose.Schema({
  userId: String,
  address: String,
  city: String,
  created_at: {
    default: () => new Date(),
    type: Date,
  },
  companyDVATNum: String,
  companyName: String,
  companyVatNum: String,
  deliveryMethode: String,
  email: String,
  firstName: String,
  lastName: String,
  message: String,
  optionalAddress: String,
  optionalCity: String,
  optionalPostalCode: String,
  paymentMethode: String,
  phone: String,
  postalCode: String,
  state: String,
  status: {
    default: 0,
    type: Number,
  },
  totalPrice: Number,
  orderId: String,
  products: [Object],
});

export default mongoose.model<IOrder>('Order', OrderSchema);
