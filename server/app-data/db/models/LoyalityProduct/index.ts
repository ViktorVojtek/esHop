import mongoose, { Document } from 'mongoose';

export interface ILoyalityProduct extends Document {
  costPoints: number;
  dateCreated: Date;
  isDiscount: boolean;
  title: string;
}
const LoyalityProductSchema = new mongoose.Schema({
  costPoints: Number,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  isDiscount: Boolean,
  title: String,
});

const LoyalityProduct = mongoose.model<ILoyalityProduct>(
  'LoyalityProduct',
  LoyalityProductSchema
);

export default LoyalityProduct;
