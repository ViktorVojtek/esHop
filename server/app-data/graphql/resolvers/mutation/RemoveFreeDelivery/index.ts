import mongoose from 'mongoose';
import FreeDelivery, {
  IFreeDelivery,
} from '../../../../db/models/FreeDelivery';
import ModError from '../../utils/error';

const removeFreeDelivery: (
  root: any,
  args: { id: string },
  ctx: any
) => Promise<string> = async (root, { id }, ctx) => {
  try {
    const exist: IFreeDelivery = await FreeDelivery.findOne({
      _id: mongoose.Types.ObjectId(id),
    });

    if (!exist) {
      throw new ModError(404, 'Not found.');
    }

    await FreeDelivery.deleteOne({ _id: mongoose.Types.ObjectId(id) });

    return `Free delivery with id: ${id} has been successfuly removed`;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default removeFreeDelivery;
