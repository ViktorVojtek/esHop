import mongoose from 'mongoose';
import Order, { IOrder } from '../../../../db/models/Order';
import ModError from '../../utils/error';

const order: (root: any, args: any, ctx: any) => Promise<IOrder> = async (
  root,
  { _id },
  ctx
) => {
  console.log(_id);
  const orderExist = await Order.findOne({ _id: mongoose.Types.ObjectId(_id) });

  if (!orderExist) {
    throw new ModError(404, `No order with id: ${_id} has been found`);
  }

  return orderExist;
};

export default order;
