import Order, { IOrder } from '../../../../db/models/Order';

const createOrder: (root: any, args: any, ctx: any) => Promise<IOrder> = async (
  root,
  { data },
  ctx
) => {
  const newOrder = new Order(data);

  await Order.create(newOrder);

  const { __v, ...result } = newOrder.toObject();

  return result;
};

export default createOrder;
