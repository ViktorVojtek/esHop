import mongoose, { Document } from 'mongoose';

export interface IOrder extends Document {
  address: string;
  city: string;
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
  totalPrice: number;
  products: string[];
}

const OrderSchema = new mongoose.Schema({
  address: String,
  city: String,
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
  totalPrice: Number,
  products: [String],
});

export default mongoose.model<IOrder>('Order', OrderSchema);
