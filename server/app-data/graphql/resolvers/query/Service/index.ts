import mongoose from 'mongoose';
import Service, { IService } from '../../../../db/models/Service';
import ModError from '../../utils/error';

export default async (
  root: any,
  args: { id: string },
  ctx: any
): Promise<IService> => {
  try {
    const { id } = args;

    const service = await Service.findOne({ _id: mongoose.Types.ObjectId(id) });

    if (!service) {
      throw new ModError(404, 'Product not exist');
    }

    return service;
  } catch (err) {
    throw new Error(err);
  }
};
