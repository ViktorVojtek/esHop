import Order, { IOrder } from '../../../../db/models/Order';

const orders: () => Promise<IOrder[]> = async () => {
  const orderItems = (await Order.find()) || [];

  return orderItems;
};

export default orders;
