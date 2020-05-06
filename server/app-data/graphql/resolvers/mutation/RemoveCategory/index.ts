import mongoose from 'mongoose';
import Category, { ICategory } from '../../../../db/models/Category';
import { config } from '../../../../config';
import { verifyToken } from '../../utils';
import ModError from '../../utils/error';

const removeCategory: (
  root: any,
  args: any,
  ctx: any
) => Promise<string> = async (root, { _id }, ctx) => {
  try {
    const { superSecret } = config;
    await verifyToken(ctx, superSecret);

    const categoryExist: ICategory = await Category.findOne({
      _id: mongoose.Types.ObjectId(_id),
    });

    if (!categoryExist) {
      throw new ModError(404, 'Category not exist');
    }

    await Category.deleteOne({ _id: mongoose.Types.ObjectId(_id) });

    return `Category with _id: ${_id} has been successfuly removed.`;
  } catch (err) {
    throw new Error(err);
  }
};

export default removeCategory;
