import Order, { IOrder } from '../../../../db/models/Order';

const orders: (
  root: any,
  args: { email?: string },
  ctx: any
) => Promise<IOrder[]> = async (root, args, ctx) => {
  const { email } = args;

  const orderItems =
    email && email.length > 0
      ? (await Order.find({ email: email })) || []
      : (await Order.find()) || [];

  return orderItems.reverse();
};

export default orders;
