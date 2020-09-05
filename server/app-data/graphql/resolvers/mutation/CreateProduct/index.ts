/* eslint-disable no-underscore-dangle */
import Product, { IProduct } from '../../../../db/models/Product';
import { config } from '../../../../config';
import { verifyToken, getVariantImagesPaths } from '../../utils';
import ModError from '../../utils/error';

const createProduct: (
  root: any,
  args: any,
  ctx: any
) => Promise<IProduct> = async (root, { productInput }, ctx) => {
  try {
    const { superSecret } = config;
    await verifyToken(ctx, superSecret);

    const { title } = productInput;

    const productExist: IProduct = await Product.findOne({ title });

    if (productExist) {
      throw new ModError(403, 'Product already exist.');
    }

    const { variants, ...restProductData } = productInput;
    const productData = new Product(restProductData);

    let i = 0;
    let variantsData = [];

    while (variants.length > i) {
      const { images } = variants[i];
      let imagesData: any[] = [];

      if (images && images.length > 0) {
        const vId = `${productData._id}-${variants[i].title.toUpperCase()}`;

        imagesData = await getVariantImagesPaths(images, vId);
      }

      const resultVariant = {
        ...variants[i],
        images: imagesData,
      };

      variantsData.push(resultVariant);

      i += 1;
    }

    const newProductData = {
      ...productData.toObject(),
      variants: variantsData,
    };

    const newProduct = await Product.create(newProductData);

    const { __v, ...result } = newProduct.toObject();

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export default createProduct;
