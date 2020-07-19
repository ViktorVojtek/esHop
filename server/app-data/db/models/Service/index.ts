import mongoose, { Document } from 'mongoose';

export interface IService extends Document {
  category: object;
  discount: number;
  html: string;
  img: object;
  price: object;
  subCategory: object;
  video: string;
  title: string;
}

const ServiceSchema = new mongoose.Schema({
  category: Object,
  discount: Number,
  html: String,
  img: Object,
  price: Object,
  subCategory: Object,
  video: String,
  title: String,
});

export default mongoose.model<IService>('Service', ServiceSchema);
