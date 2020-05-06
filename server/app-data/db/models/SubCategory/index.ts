import mongoose, { Document } from 'mongoose';

export interface ISubCategory extends Document {
  categoryId: string;
  signFlag: string;
  title: string;
}

const SubCategorySchema = new mongoose.Schema({
  categoryId: String,
  signFlag: String,
  title: String,
});

const SubCategory = mongoose.model<ISubCategory>(
  'SubCategory',
  SubCategorySchema
);

export default SubCategory;
