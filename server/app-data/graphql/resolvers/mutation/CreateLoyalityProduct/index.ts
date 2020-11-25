/* eslint-disable no-underscore-dangle */
import { config } from '../../../../config';
import LoyalityProduct, {
  ILoyalityProduct,
} from '../../../../db/models/LoyalityProduct';
import { getLoyalityProductImagePath, verifyToken } from '../../utils';
import ModError from '../../utils/error';

const createLoyalityProduct: (
  root: any,
  args: any,
  ctx: any
) => Promise<ILoyalityProduct> = async (
  root,
  { loyalityProductInput },
  ctx
) => {
  try {
    const { superSecret } = config;
    await verifyToken(ctx, superSecret);

    const { title, image } = loyalityProductInput;

    const productExist: ILoyalityProduct = await LoyalityProduct.findOne({
      title,
    });

    if (productExist) {
      throw new ModError(403, 'Product already exist.');
    }

    const imagesData = await getLoyalityProductImagePath(image, title);

    const productData = new LoyalityProduct(loyalityProductInput);

    const newProductData = {
      ...productData.toObject(),
      image: imagesData,
    };

    const newProduct = await LoyalityProduct.create(newProductData);

    const { __v, ...result } = newProduct.toObject();

    console.log(result);

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export default createLoyalityProduct;
