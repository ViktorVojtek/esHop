/* eslint-disable no-underscore-dangle */
import uniqid from 'uniqid';
import Product, { IProduct } from '../../../../db/models/Product';
import { config } from '../../../../config';
import { verifyToken, storeFile } from '../../utils';
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

    const { images, ...prodRawDataWithOutImgs } = productInput;

    const productData: IProduct = new Product(prodRawDataWithOutImgs);

    let i = 0;
    const imagesDataArr = [];
    const resultImagesDataArr = [];
    let imagePaths = [];

    if (images && images.length > 0) {
      while (i < images.length) {
        const { base64, title: imageTitle, ext } = images[i];

        const fileData = {
          fileName: imageTitle,
          fileBase64Data: base64,
          dirName: productData._id,
          extension: ext,
        };

        const promiseFn = storeFile(fileData);

        imagesDataArr.push(promiseFn);

        i += 1;
      }

      imagePaths = await Promise.all(imagesDataArr);

      let j = 0;

      while (j < imagePaths.length) {
        const { base64, ...restImageData } = images[j];
        const imageData = {
          ...restImageData,
          imageId: uniqid('img-'),
          path: imagePaths[j],
        };

        resultImagesDataArr.push(imageData);

        j += 1;
      }
    }

    const newProductData = {
      ...productData.toObject(),
      images: resultImagesDataArr,
    };

    const newProduct = await Product.create(newProductData);

    const { __v, ...result } = newProduct.toObject();

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export default createProduct;
