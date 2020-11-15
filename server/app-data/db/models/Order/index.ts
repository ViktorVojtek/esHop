import mongoose, { Document } from 'mongoose';

export interface IOrder extends Document {
  userId?: string;
  address: string;
  city: string;
  created_at: Date;
  companyDVATNum: string;
  companyDTAXNum: string;
  companyName: string;
  companyVatNum: string;
  deliveryMethode: string;
  deliveryPrice: number;
  email: string;
  firstName: string;
  invoiceId: string;
  lastName: string;
  message: string;
  optionalAddress: string;
  optionalCity: string;
  optionalPostalCode: string;
  paymentMethode: string;
  paymentStatus: number;
  phone: string;
  postalCode: string;
  state: string;
  optionalState: string;
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
  companyDTAXNum: String,
  companyName: String,
  companyVatNum: String,
  deliveryMethode: String,
  deliveryPrice: {
    default: 0,
    type: Number,
  },
  email: String,
  firstName: String,
  invoiceId: String,
  lastName: String,
  message: String,
  optionalAddress: String,
  optionalCity: String,
  optionalPostalCode: String,
  paymentMethode: String,
  paymentStatus: {
    default: 0,
    type: Number,
  },
  phone: String,
  postalCode: String,
  state: String,
  optionalState: String,
  status: {
    default: 0,
    type: Number,
  },
  totalPrice: Number,
  orderId: String,
  products: [Object],
});

export default mongoose.model<IOrder>('Order', OrderSchema);
