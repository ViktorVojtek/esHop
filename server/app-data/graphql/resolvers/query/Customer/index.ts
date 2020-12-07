import mongoose from 'mongoose';
import Customer from '../../../../db/models/Customer';
import ModError from '../../utils/error';

export default async (root: any, args: any, ctx: any) => {
  try {
    const { id } = args;
    const customer = await Customer.findOne({
      _id: mongoose.Types.ObjectId(id),
    });

    if (!customer) {
      throw new ModError(404, 'Customer not found');
    }

    return customer;
  } catch (err) {
    throw new Error(err.message);
  }
};
