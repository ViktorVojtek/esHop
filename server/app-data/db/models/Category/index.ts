import mongoose, { Document } from 'mongoose';

export interface ICategory extends Document {
  signFlag: string;
  title: string;
}

const CategorySchema = new mongoose.Schema({
  signFlag: String,
  title: String,
});

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
