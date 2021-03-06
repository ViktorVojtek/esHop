import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Customer from '../../../../db/models/Customer';
import ModError from '../../utils/error';

export default async (root: any, args: any, ctx: any) => {
  try {
    const { id, oldPass, newPass } = args;
    const customerExist = await Customer.findOne({
      _id: mongoose.Types.ObjectId(id),
    });

    if (!customerExist) {
      throw new ModError(404, 'Customer not found');
    }

    const {
      __v,
      password: passwordHash,
      ...userData
    } = customerExist.toObject();

    const passwordMatch: boolean = await bcrypt.compare(oldPass, passwordHash);

    if (passwordMatch === false) {
      throw new ModError(401, 'Customer not found');
    }

    const hashedPasw = await bcrypt.hash(newPass, 10);

    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(customerExist._id) },
      { $set: { password: hashedPasw } }
    );

    const { ...returnCustomerData } = updatedCustomer.toObject();

    return returnCustomerData;
  } catch (err) {
    throw new Error(err.message);
  }
};
