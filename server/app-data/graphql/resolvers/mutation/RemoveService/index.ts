import mongoose from 'mongoose';
import Service, { IService } from '../../../../db/models/Service';
import ModError from '../../utils/error';

export default async (root: any, args: { _id: string }, ctx: any) => {
  try {
    const { _id } = args;
    const serviceExist: IService = await Service.findOne({
      _id: mongoose.Types.ObjectId(_id),
    });

    if (!serviceExist) {
      throw new ModError(404, 'Service not exist');
    }

    await Service.deleteOne({ _id: mongoose.Types.ObjectId(_id) });

    return 'Service has been successfuly removed';
  } catch (err) {
    throw new Error(err.message);
  }
};
