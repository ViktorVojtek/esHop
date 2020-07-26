import mongoose from 'mongoose';
import Customer from '../../../../db/models/Customer';
import ModError from '../../utils/error';

export default async (root: any, args: any, ctx: any) => {
  try {
    const { id, customerData: { email, firstName, lastName, password, role } } = args;
    const customerExist = await Customer.findOne({ _id: mongoose.Types.ObjectId(id) });

    if (!customerExist) {
      throw new ModError(404, 'Customer not found');
    }

    const newCustomerData = {
      email,
      firstName,
      lastName,
      password,
      role
    };

    const updatedCustomer = await Customer.updateOne({ _id: mongoose.Types.ObjectId(id) }, newCustomerData);

    const { __v, ...returnCustomerData } = updatedCustomer;

    return returnCustomerData;
  } catch (err) {
    throw new Error(err.message);
  }
};
