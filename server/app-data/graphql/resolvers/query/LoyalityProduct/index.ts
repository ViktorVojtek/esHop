import mongoose from 'mongoose';
import LoyalityProduct, {
  ILoyalityProduct,
} from '../../../../db/models/LoyalityProduct';
import ModError from '../../utils/error';

const loyalityProducts: (
  root: any,
  args: any,
  ctx: any
) => Promise<ILoyalityProduct[]> = async (root, { id }, ctx) => {
  try {
    const result = (await LoyalityProduct.find()) || [];

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export default loyalityProducts;
