import mongoose, { Document } from 'mongoose';

export type AddressType = {
  city: string;
  state: string;
  street: string;
  postcode: string;
};
export type CutomerType = {
  address: AddressType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export interface IOrder extends Document {
  customer: CutomerType;
  paymentMethod: string;
  products: any[];
}

const OrderSchema = new mongoose.Schema({
  customer: {
    address: {
      city: String,
      state: String,
      street: String,
      postcode: String,
    },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
  },
  paymentMethod: {
    type: String,
    enum: ['CARD', 'CASH_ON_DELIVERY'],
    default: 'CARD',
  },
  products: [Object],
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
