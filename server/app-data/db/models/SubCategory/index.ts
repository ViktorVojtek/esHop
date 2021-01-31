import mongoose, { Document } from 'mongoose';

export interface ISubCategory extends Document {
  categoryId: string;
  signFlag: string;
  title: string;
  image: object;
  forReservation: Boolean;
  forSale: Boolean;
  forGiftCard: Boolean;
  forGiftBasket: Boolean;
}

const SubCategorySchema = new mongoose.Schema({
  categoryId: String,
  signFlag: String,
  title: String,
  image: Object,
  forReservation: {
    default: false,
    type: Boolean,
  },
  forSale: {
    default: false,
    type: Boolean,
  },
  forGiftCard: {
    default: false,
    type: Boolean,
  },
  forGiftBasket: {
    default: false,
    type: Boolean,
  },
});

const SubCategory = mongoose.model<ISubCategory>(
  'SubCategory',
  SubCategorySchema
);

export default SubCategory;
