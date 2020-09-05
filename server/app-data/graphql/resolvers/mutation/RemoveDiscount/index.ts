import mongoose from 'mongoose';
import Discount, { IDiscount } from '../../../../db/models/Discount';
import ModError from '../../utils/error';

const removeDiscount: (
  root: any,
  args: { id: string },
  ctx: any
) => Promise<string> = async (root, { id }, ctx) => {
  try {
    const exist: IDiscount = await Discount.findOne({
      _id: mongoose.Types.ObjectId(id),
    });

    if (!exist) {
      throw new ModError(404, 'Not found.');
    }

    await Discount.deleteOne({ _id: mongoose.Types.ObjectId(id) });

    return `Discount with id: ${id} has been successfuly removed`;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default removeDiscount;
