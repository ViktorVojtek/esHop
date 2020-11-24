/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import { config } from '../../../../config';
import LoyalityProduct, {
  ILoyalityProduct,
} from '../../../../db/models/LoyalityProduct';
import { verifyToken } from '../../utils';
import ModError from '../../utils/error';

const updateLoyalityProduct: (
  root: any,
  args: any,
  ctx: any
) => Promise<ILoyalityProduct> = async (root, { _id, productInput }, ctx) => {
  try {
    const { superSecret } = config;
    await verifyToken(ctx, superSecret);

    const productExist: ILoyalityProduct = await LoyalityProduct.findOne({
      _id: mongoose.Types.ObjectId(_id),
    });

    if (!productExist) {
      throw new ModError(404, 'Product not exist.');
    }

    const { title, costPoints, isDiscount } = productInput;
    const productData = { title, costPoints, isDiscount };

    const updatedProduct: ILoyalityProduct = await LoyalityProduct.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(_id) },
      {
        $set: {
          costPoints: productData.costPoints,
          isDiscount: productData.isDiscount,
          title: productData.title,
        },
      },
      { new: true }
    );

    const { __v, ...result } = updatedProduct.toObject();

    return result as ILoyalityProduct;
  } catch (err) {
    throw new Error(err);
  }
};

export default updateLoyalityProduct;
