import mongoose, { Document } from 'mongoose';

export interface IService extends Document {
  category: object;
  html: string;
  img: string;
  price: number;
  subCategory: object;
  video: string;
}

const ServiceSchema = new mongoose.Schema({
  category: Object,
  html: String,
  img: String,
  price: Number,
  subCategory: Object,
  video: String,
});

export default mongoose.model<IService>('Service', ServiceSchema);
