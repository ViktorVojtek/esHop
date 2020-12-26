import mongoose from 'mongoose';
import FreeDelivery, {
  IFreeDelivery,
} from '../../../../db/models/FreeDelivery';
import ModError from '../../utils/error';

const updateFreeDelivery: (
  root: any,
  args: { value: number; id: string },
  ctx: any
) => Promise<IFreeDelivery> = async (root, { value, id }, ctx) => {
  try {
    const currencyExist: IFreeDelivery = await FreeDelivery.findOne({
      _id: mongoose.Types.ObjectId(id),
    });

    if (!currencyExist) {
      throw new ModError(404, 'Currency not exist');
    }

    const updatedFreeDelivery: IFreeDelivery = await FreeDelivery.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      {
        $set: {
          value,
        },
      },
      { new: true }
    );

    const { __v, ...result } = updatedFreeDelivery.toObject();

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default updateFreeDelivery;
