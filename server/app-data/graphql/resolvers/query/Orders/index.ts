import Order, { IOrder } from '../../../../db/models/Order';

const orders: (
  root: any,
  args: { id?: string },
  ctx: any
) => Promise<IOrder[]> = async (root, args, ctx) => {
  const { id } = args;

  const orderItems =
    id && id.length > 0
      ? (await Order.find({ userId: id })) || []
      : (await Order.find()) || [];

  return orderItems;
};

export default orders;
