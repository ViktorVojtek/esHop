/* eslint-disable no-underscore-dangle */
import { config } from '../../../../config';
import LoyalityProduct, {
  ILoyalityProduct,
} from '../../../../db/models/LoyalityProduct';
import { verifyToken } from '../../utils';
import ModError from '../../utils/error';

const createLoyalityProduct: (
  root: any,
  args: any,
  ctx: any
) => Promise<ILoyalityProduct> = async (root, { productInput }, ctx) => {
  try {
    const { superSecret } = config;
    await verifyToken(ctx, superSecret);

    const { title } = productInput;

    const productExist: ILoyalityProduct = await LoyalityProduct.findOne({
      title,
    });

    if (productExist) {
      throw new ModError(403, 'Product already exist.');
    }

    const productData = new LoyalityProduct(productInput);

    const newProductData = {
      ...productData.toObject(),
    };

    const newProduct = await LoyalityProduct.create(newProductData);

    const { __v, ...result } = newProduct.toObject();

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export default createLoyalityProduct;
