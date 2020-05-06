import mongoose, { Document } from 'mongoose';

export interface ICurrency extends Document {
  defaultCurrency: boolean;
  flag: string;
  modifiedByUserId: string;
  sign: string;
  valueSetDate: Date;
  value: number;
  title: string;
}

const CurrencySchema = new mongoose.Schema({
  defaultCurrency: Boolean,
  flag: String,
  modifiedByUserId: String,
  sign: String,
  valueSetDate: Date,
  value: {
    default: 1,
    type: Number,
  },
  title: String,
});

const Currency = mongoose.model<ICurrency>('Currency', CurrencySchema);

export default Currency;
