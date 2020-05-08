import mongoose, { Document } from 'mongoose';

interface IDelivery extends Document {
  title: string;
  value: number;
}

const DeliverySchema: mongoose.Schema<IDelivery> = new mongoose.Schema({
  title: String,
  value: Number,
});

const Delivery = mongoose.model<IDelivery>('Delivery', DeliverySchema);

export default Delivery;
