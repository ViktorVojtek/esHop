import mongoose from 'mongoose';
import Discount, { IDiscount } from '../../../../db/models/Discount';
import ModError from '../../utils/error';

export default async (root: any, args: any, ctx: any): Promise<IDiscount> => {
  try {
    const { code } = args;
    const discountExist = await Discount.findOne({
      code,
    });

    if (!discountExist) {
      throw new ModError(404, 'Discount not found');
    }

    return discountExist;
  } catch (err) {
    throw new Error(err.message);
  }
};
