/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
var fs = require('fs');
import Product, { IProduct } from '../../../../db/models/Product';
import { config } from '../../../../config';
import { verifyToken, storeFile, getVariantImagesPaths } from '../../utils';
import ModError from '../../utils/error';
var rimraf = require('rimraf');
import * as path from 'path';

const updateProduct: (
  root: any,
  args: any,
  ctx: any
) => Promise<IProduct> = async (root, { _id, productInput }, ctx) => {
  const dir: string = path.resolve(__dirname, `../../../../../..`);
  try {
    const { superSecret } = config;
    await verifyToken(ctx, superSecret);

    const productExist: IProduct = await Product.findOne({
      _id: mongoose.Types.ObjectId(_id),
    });

    if (!productExist) {
      throw new ModError(404, 'Product not exist.');
    }

    const { variants, ...restProductData } = productInput;
    const productData = { ...restProductData };

    let i = 0;
    let variantsData = [];

    while (i < variants.length) {
      let imagesData: any[] = [];
      const resultVariant = { ...variants[i] };

      if (variants[i].images && variants[i].images.length > 0) {
        const { images } = variants[i];

        for (let j = 0; j < images.length; j++) {
          if (images[j].base64) {
            const vId = `${_id}-${variants[i].title.toUpperCase()}`;
            const imageData = await getVariantImagesPaths([images[j]], vId);
            imagesData.push(imageData[0]);
          } else {
            imagesData.push(images[j]);
          }
        }
        resultVariant.images = imagesData;
      }

      variantsData.push(resultVariant);

      i += 1;
    }

    productData.variants = variantsData;

    const updatedProduct: IProduct = await Product.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(_id) },
      {
        $set: {
          category: productData.category,
          isEnvelopeSize: productData.isEnvelopeSize,
          subCategory: productData.subCategory,
          title: productData.title,
          slug: productData.slug,
          variants: productData.variants,
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
