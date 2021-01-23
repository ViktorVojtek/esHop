import mongoose, { Document } from 'mongoose';

export interface IProduct extends Document {
  category: Object;
  dateCreated: Date;
  dateDeleted: Date;
  dateModified: Date;
  deleted: boolean;
  modifiedByUserId: string;
  subCategory: Object;
  isEnvelopeSize: Boolean;
  title: string;
  slug: string;
  variants: any[];
}
const ProductSchema = new mongoose.Schema({
  category: Object,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateDeleted: Date,
  dateModified: Date,
  deleted: {
    default: false,
    type: Boolean,
  },
  modifiedByUserId: String,
  subCategory: Object,
  isEnvelopeSize: {
    type: Boolean,
    default: false,
  },
  title: String,
  slug: String,
  variants: [Object],
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
