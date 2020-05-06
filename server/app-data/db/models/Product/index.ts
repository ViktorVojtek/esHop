import mongoose, { Document } from 'mongoose';

export interface IProduct extends Document {
  category: string;
  dateCreated: Date;
  dateDeleted: Date;
  dateModified: Date;
  description: string;
  deleted: boolean;
  inStock: boolean;
  modifiedByUserId: string;
  shortDescription: string;
  subCategory: string;
  images: any[];
  note: string;
  title: string;
  variant: any[];
}
const ProductSchema = new mongoose.Schema({
  category: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateDeleted: Date,
  dateModified: Date,
  description: String,
  deleted: {
    default: false,
    type: Boolean,
  },
  inStock: Boolean,
  modifiedByUserId: String,
  shortDescription: String,
  subCategory: String,
  images: [Object],
  note: String,
  title: String,
  variant: [Object],
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
