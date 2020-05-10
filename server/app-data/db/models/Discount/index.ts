import mongoose, { Document } from 'mongoose';

export interface IDiscount extends Document {
  code: string;
  value: number;
}

const DiscountSchema: mongoose.Schema<IDiscount> = new mongoose.Schema({
  code: String,
  value: Number,
});

const Discount = mongoose.model<IDiscount>('Discount', DiscountSchema);

export default Discount;
