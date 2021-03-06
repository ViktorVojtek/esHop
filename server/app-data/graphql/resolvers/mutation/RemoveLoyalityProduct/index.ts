import mongoose from 'mongoose';
import { config } from '../../../../config';
import LoyalityProduct, {
  ILoyalityProduct,
} from '../../../../db/models/LoyalityProduct';
import { verifyToken } from '../../utils';
import ModError from '../../utils/error';

const removeLoyalityProduct: (
  root: any,
  args: any,
  ctx: any
) => Promise<string> = async (root, { id }, ctx) => {
  try {
    const { superSecret } = config;
    await verifyToken(ctx, superSecret);

    const productExist: ILoyalityProduct = await LoyalityProduct.findOne({
      _id: mongoose.Types.ObjectId(id),
    });

    if (!productExist) {
      throw new ModError(404, 'Product not exist');
    }

    await LoyalityProduct.deleteOne({ _id: mongoose.Types.ObjectId(id) });

    return `Product with _id: ${id} has been successfuly removed`;
  } catch (err) {
    throw new Error(err);
  }
};

export default removeLoyalityProduct;
