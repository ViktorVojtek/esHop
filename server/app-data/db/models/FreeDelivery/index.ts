import mongoose, { Document } from 'mongoose';

export interface IFreeDelivery extends Document {
  value: number;
}

const FreeDeliverySchema: mongoose.Schema<IFreeDelivery> = new mongoose.Schema({
  value: Number,
});

const FreeDelivery = mongoose.model<IFreeDelivery>(
  'FreeDelivery',
  FreeDeliverySchema
);

export default FreeDelivery;
