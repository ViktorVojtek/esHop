import mongoose, { Document } from 'mongoose';

export interface IService extends Document {
  category: object;
  html: string;
  img: object;
  price: number;
  subCategory: object;
  video: string;
  title: string;
}

const ServiceSchema = new mongoose.Schema({
  category: Object,
  html: String,
  img: Object,
  price: Number,
  subCategory: Object,
  video: String,
  title: String,
});

export default mongoose.model<IService>('Service', ServiceSchema);
