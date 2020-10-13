import mongoose from 'mongoose';
import Order, { IOrder } from '../../../../db/models/Order';
// import { storeFile } from '../../utils';
import ModError from '../../utils/error';

export default async (
  root: any,
  args: {
    _id: string;
    status: number;
  },
  ctx: any
): Promise<IOrder> => {
  try {
    const { _id, status } = args;
    const serviceExist: IOrder = await Order.findOne({
      _id: mongoose.Types.ObjectId(_id),
    });

    if (!serviceExist) {
      throw new ModError(404, 'Service not exist');
    }

    const updatedOrder = await Order.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(_id),
      },
      {
        $set: { status },
      },
      { new: true }
    );

    const { __v, ...result } = updatedOrder.toObject();

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};
