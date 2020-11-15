import mongoose from 'mongoose';
import Order, { IOrder } from '../../../../db/models/Order';
import ModError from '../../utils/error';

export default async (
  root: any,
  args: {
    _id: string;
    paymentStatus: number;
  },
  ctx: any
): Promise<IOrder> => {
  try {
    const { _id, paymentStatus } = args;
    const orderExist: IOrder = await Order.findOne({
      _id: mongoose.Types.ObjectId(_id),
    });

    if (!orderExist) {
      throw new ModError(404, 'Order not exist');
    }

    const updatedOrder = await Order.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(_id),
      },
      {
        $set: { paymentStatus },
      },
      { new: true }
    );

    const { __v, ...result } = updatedOrder.toObject();

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};
