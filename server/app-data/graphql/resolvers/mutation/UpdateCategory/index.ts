import mongoose from 'mongoose';
import Category, { ICategory } from '../../../../db/models/Category';
import ModError from '../../utils/error';
import { config } from '../../../../config';
import { verifyToken } from '../../utils';

const updateCategory: (
  root: any,
  args: any,
  ctx: any
) => Promise<ICategory> = async (root, { _id, title }, ctx) => {
  try {
    const { superSecret } = config;
    await verifyToken(ctx, superSecret);

    const categoryExist = await Category.findOne({
      _id: mongoose.Types.ObjectId(_id),
    });

    if (!categoryExist) {
      throw new ModError(404, 'Category not exist');
    }

    const sign: string = title.toUpperCase().replace(/ /g, '_');

    const updatedCategoryData: ICategory = await Category.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(_id) },
      { $set: { sign, title } },
      { new: true }
    );

    const { __v, ...result } = updatedCategoryData.toObject();

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export default updateCategory;
