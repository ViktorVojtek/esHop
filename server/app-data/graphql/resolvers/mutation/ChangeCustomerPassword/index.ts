import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Customer from '../../../../db/models/Customer';
import ModError from '../../utils/error';

export default async (root: any, args: any, ctx: any) => {
  try {
    const { token, password } = args;
    const customerExist = await Customer.findOne({
      resetPasswordToken: token,
    });

    if (!customerExist) {
      throw new ModError(404, 'Customer not found');
    }

    const hashedPasw = await bcrypt.hash(password, 10);

    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(customerExist._id) },
      { $set: { password: hashedPasw, resetPasswordToken: '' } }
    );

    const { __v, ...returnCustomerData } = updatedCustomer.toObject();

    return returnCustomerData;
  } catch (err) {
    throw new Error(err.message);
  }
};
