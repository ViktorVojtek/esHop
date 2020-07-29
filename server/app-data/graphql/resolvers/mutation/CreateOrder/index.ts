import Order, { IOrder } from '../../../../db/models/Order';

const createOrder: (root: any, args: any, ctx: any) => Promise<String> = async (
  root,
  { data },
  ctx
) => {
  const newOrder = new Order(data);

  await Order.create(newOrder);

  const { __v, ...result } = newOrder.toObject();

  return 'Order has been created.'; //result;
};

export default createOrder;
