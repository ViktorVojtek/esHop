import mongoose from 'mongoose';
import SubCategory, { ISubCategory } from '../../../../db/models/SubCategory';
import { config } from '../../../../config';
import { verifyToken } from '../../utils';
import ModError from '../../utils/error';

const removeSubCategory: (
  root: any,
  args: any,
  ctx: any
) => Promise<string> = async (root, { _id }, ctx) => {
  try {
    const { superSecret } = config;
    await verifyToken(ctx, superSecret);

    const subCategoryExist: ISubCategory = await SubCategory.findOne({
      _id: mongoose.Types.ObjectId(_id),
    });

    if (!subCategoryExist) {
      throw new ModError(404, 'Subcategory not exist');
    }

    await SubCategory.deleteOne({ _id: mongoose.Types.ObjectId(_id) });

    return `Subcategory with _id: ${_id} has been successfuly removed.`;
  } catch (err) {
    throw new Error(err);
  }
};

export default removeSubCategory;
