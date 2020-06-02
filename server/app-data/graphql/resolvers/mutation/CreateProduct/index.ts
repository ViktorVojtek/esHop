/* eslint-disable no-underscore-dangle */
import Product, { IProduct } from '../../../../db/models/Product';
import { config } from '../../../../config';
import { verifyToken, storeFile } from '../../utils';
import ModError from '../../utils/error';
import { decodeBase64 } from 'bcryptjs';

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

function getVariantImagesPaths(
  images: { base64: string; title: string; ext: string }[],
  vId: string
): Promise<any[]> {
  let j: number = 0;
  const variantImagesDataArr = [];

  return new Promise(async (resolve) => {
    while (images.length > j) {
      const { base64, title: imageTitle, ext } = images[j];

      const fileData = {
        fileName: imageTitle,
        fileBase64Data: base64,
        dirName: vId,
        extension: ext,
      };

      const promiseFn = storeFile(fileData);

      variantImagesDataArr.push(promiseFn);

      j += 1;
    }

    const paths = await Promise.all(variantImagesDataArr);

    let k = 0;
    const variantImagesData = [];

    while (paths.length > k) {
      const { base64, ...restImageData } = images[k];
      const imageData = {
        ...restImageData,
        path: paths[k],
      };

      variantImagesData.push(imageData);
      k += 1;
    }

    resolve(variantImagesData);
  });
}

export default createProduct;
