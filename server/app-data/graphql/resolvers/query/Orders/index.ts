import * as mongoose from 'mongoose';
import Order, { IOrder } from '../../../../db/models/Order';

const orders: (
  root: any,
  args: { id?: string },
  ctx: any
) => Promise<IOrder[]> = async (root, args, ctx) => {
  const { id } = args;

  const orderItems = id
    ? (await Order.find()) || []
    : (await Order.find({ _id: mongoose.Types.ObjectId(id) })) || [];

  return orderItems;
};

export default orders;
