import mongoose, { Document } from 'mongoose';

export interface ILoyalityProduct extends Document {
  costPoints: number;
  dateCreated: Date;
  discount?: number;
  isDiscount: boolean;
  image: string;
  title: string;
}
const LoyalityProductSchema = new mongoose.Schema({
  costPoints: Number,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  discount: {
    type: Number,
    default: 0,
  },
  isDiscount: Boolean,
  image: String,
  title: String,
});

const LoyalityProduct = mongoose.model<ILoyalityProduct>(
  'LoyalityProduct',
  LoyalityProductSchema
);

export default LoyalityProduct;
