import mongoose from 'mongoose';
import Customer, { ICustomer } from '../../../../db/models/Customer';
import Order, { IOrder } from '../../../../db/models/Order';
import ModError from '../../utils/error';

const createOrder: (root: any, args: any, ctx: any) => Promise<String> = async (
  root,
  { data },
  ctx
) => {
  const newOrder: IOrder = new Order(data);

  await Order.create(newOrder);

  const { userId } = data;

  if (userId) {
    const customerExist: ICustomer = await Customer.findOne({
      _id: mongoose.Types.ObjectId(userId),
    });

    if (!customerExist) {
      throw new ModError(404, 'Customer does not exist');
    }

    const custData = customerExist.toObject();
    const updatedCustData = {
      ...custData,
      customerPoints: custData.customerPoints + 1,
    };

    await Customer.findByIdAndUpdate(userId, updatedCustData);
  }

  // const { __v, ...result } = newOrder.toObject();

  return 'Order has been created.';
};

export default createOrder;
