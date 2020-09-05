import mongoose from 'mongoose';
import Discount, { IDiscount } from '../../../../db/models/Discount';
import ModError from '../../utils/error';

const discount: (
  root: any,
  args: { id: string },
  ctx: any
) => Promise<IDiscount> = async (root, { id }, ctx) => {
  try {
    const exist: IDiscount = await Discount.findOne({
      _id: mongoose.Types.ObjectId(id),
    });

    if (!exist) {
      throw new ModError(404, 'Not found');
    }

    const { __v, ...returnItem } = exist.toObject();

    return returnItem;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default discount;
