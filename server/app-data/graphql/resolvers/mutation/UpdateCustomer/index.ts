import mongoose from 'mongoose';
import Customer from '../../../../db/models/Customer';
import ModError from '../../utils/error';

export default async (root: any, args: any, ctx: any) => {
  try {
    const { id, customerData } = args;
    const customerExist = await Customer.findOne({
      _id: mongoose.Types.ObjectId(id),
    });

    if (!customerExist) {
      throw new ModError(404, 'Customer not found');
    }

    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(id) },
      { $set: customerData },
      { new: true }
    );

    const { __v, ...returnCustomerData } = updatedCustomer.toObject();

    return returnCustomerData;
  } catch (err) {
    throw new Error(err.message);
  }
};
