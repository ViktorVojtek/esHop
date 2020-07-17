import mongoose, { Document } from 'mongoose';

export interface IDeliveryMethode extends Document {
  isEnvelopeSize: boolean;
  title: string;
  value: number;
}

const DeliverySchema: mongoose.Schema<IDeliveryMethode> = new mongoose.Schema({
  isEnvelopeSize: {
    type: Boolean,
    default: false,
  },
  title: String,
  value: Number,
});

const DeliveryMethode = mongoose.model<IDeliveryMethode>(
  'DeliveryMethode',
  DeliverySchema
);

export default DeliveryMethode;
