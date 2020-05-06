import mongoose from 'mongoose';
import { config } from '../../../../config';
import Category, { ICategory } from '../../../../db/models/Category';
import SubCategory, { ISubCategory } from '../../../../db/models/SubCategory';
import ModError from '../../utils/error';
import { verifyToken } from '../../utils';

const createSubCategory: (
  root: any,
  args: any,
  ctx: any
) => Promise<ISubCategory> = async (root, { categoryId, title }, ctx) => {
  try {
    const { superSecret } = config;
    await verifyToken(ctx, superSecret);

    const categoryExist: ICategory = await Category.findOne({
      _id: mongoose.Types.ObjectId(categoryId),
    });

    if (!categoryExist) {
      throw new ModError(404, 'Category you are referencing for not exist.');
    }
    const subCategoryExist: ISubCategory = await SubCategory.findOne({ title });

    if (subCategoryExist) {
      throw new ModError(403, 'Subcategory allready exist.');
    }

    const subCategoryData = {
      categoryId,
      title,
      signFlag: title.toUpperCase().replace(/ /g, '_'),
    };

    const newSubCategory: ISubCategory = new SubCategory(subCategoryData);

    await SubCategory.create(newSubCategory);

    const { __v, ...result } = newSubCategory.toObject();

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export default createSubCategory;
