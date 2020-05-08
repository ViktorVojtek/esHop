import mongoose, { Document } from 'mongoose';

interface IDeliveryMethode extends Document {
  title: string;
  value: number;
}

const DeliverySchema: mongoose.Schema<IDeliveryMethode> = new mongoose.Schema({
  title: String,
  value: Number,
});

const DeliveryMethode = mongoose.model<IDeliveryMethode>(
  'DeliveryMethode',
  DeliverySchema
);

export default DeliveryMethode;
