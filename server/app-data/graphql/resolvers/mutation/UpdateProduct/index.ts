/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import uniqid from 'uniqid';
import Product, { IProduct } from '../../../../db/models/Product';
import { config } from '../../../../config';
import { verifyToken, storeFile } from '../../utils';
import ModError from '../../utils/error';

const updateProduct: (
  root: any,
  args: any,
  ctx: any
) => Promise<IProduct> = async (root, { _id, productInput }, ctx) => {
  try {
    const { superSecret } = config;
    await verifyToken(ctx, superSecret);

    const productExist: IProduct = await Product.findOne({
      _id: mongoose.Types.ObjectId(_id),
    });

    if (!productExist) {
      throw new ModError(404, 'Product not exist.');
    }

    const { images, ...prodRawDataWithOutImgs } = productInput;

    const productData = prodRawDataWithOutImgs;

    let i = 0;
    const imagesDataArr = [];
    let resultImagesDataArr = [];
    const updateImagesArr = [];
    const existingImagesArr = [];
    let imagePaths = [];

    const oldImagesArr = (productExist as any).images;
    let imagesToDelete = [];

    console.log(oldImagesArr);

    imagesToDelete = oldImagesArr.filter((oldItem) => {
      return !images.some((cItem) => {
        return oldItem.imageId !== cItem.imageId;
      });
    });

    console.log('images to delete');
    console.log(imagesToDelete);

    if (images && images.length > 0) {
      while (i < images.length) {
        if (images[i].base64) {
          const { base64, title, ext } = images[i];

          const fileData = {
            fileName: title,
            fileBase64Data: base64,
            dirName: _id,
            extension: ext,
          };

          const promiseFn = storeFile(fileData);

          imagesDataArr.push(promiseFn);
        } else if (images[i].path) {
          existingImagesArr.push(images[i]);
        }

        i += 1;
      }

      imagePaths = await Promise.all(imagesDataArr);

      console.log(imagePaths);

      let j = 0;

      while (j < imagePaths.length) {
        const { base64, ...restImageData } = images[j];
        const imageData = {
          ...restImageData,
          imageId: uniqid('img-'),
          path: imagePaths[j],
        };

        updateImagesArr.push(imageData);

        j += 1;
      }

      resultImagesDataArr = updateImagesArr.concat(existingImagesArr);
    }

    const newProductData = {
      ...productData,
      images: resultImagesDataArr,
    };

    const updatedProduct: IProduct = await Product.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(_id) },
      {
        $set: {
          category: newProductData.category,
          description: newProductData.description,
          inStock: newProductData.inStock,
          modifiedByUserId: newProductData.modifiedByUserId,
          shortDescription: newProductData.shortDescription,
          subCategory: newProductData.subCategory,
          images: newProductData.images,
          note: newProductData.note,
          title: newProductData.title,
          variant: newProductData.variant,
        },
      },
      { new: true }
    );

    const { __v, ...result } = updatedProduct.toObject();

    return result as IProduct;
  } catch (err) {
    throw new Error(err);
  }
};

export default updateProduct;
