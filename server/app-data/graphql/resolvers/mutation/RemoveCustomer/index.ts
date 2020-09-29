import * as mongoose from 'mongoose';
import Customer, { ICustomer } from '../../../../db/models/Customer';
import ModError from '../../utils/error';

export default async (root: any, args: { id: string }, ctx: any) => {
  const { id } = args;
  const customer: ICustomer = await Customer.findOne({
    _id: mongoose.Types.ObjectId(id),
  });

  if (!customer) {
    throw new ModError(404, 'Customer not exist');
  }

  await Customer.deleteOne({ _id: mongoose.Types.ObjectId(id) });

  return `Customer with id: ${id} has been successfuly removed`;
};
