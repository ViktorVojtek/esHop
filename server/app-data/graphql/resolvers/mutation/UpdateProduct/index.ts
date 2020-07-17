/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import uniqid from 'uniqid';
import Product, { IProduct } from '../../../../db/models/Product';
import { config } from '../../../../config';
import { verifyToken, storeFile, getVariantImagesPaths } from '../../utils';
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

    console.log('Product exist.');
    console.log('Input data are:');
    console.log(productInput);
    console.log('\n');
    console.log('Finded product is:');
    console.log(productExist);
    console.log('\n');

    const { variants, ...restProductData } = productInput;
    const productData = { ...restProductData };

    console.log('Cleaned data are: ');
    console.log(productData);
    console.log('\n');

    let i = 0;
    let variantsData = [];

    while (i < variants.length) {
      const { images } = variants[i];
      let imagesData: any[] = [];

      if (images && images.length > 0 && images[0].base64) {
        const vId = `${productData._id}-${variants[i].title.toUpperCase()}`;

        imagesData = await getVariantImagesPaths(images, vId);
      } else {
        imagesData = productExist.variants[i].images;
      }

      const resultVariant = {
        ...variants[i],
        images: imagesData,
      };

      variantsData.push(resultVariant);

      i += 1;
    }

    console.log('Variants data are:');
    console.log(variantsData);
    console.log('\n');

    productData.variants = variantsData;

    console.log('Final data to update: ');
    console.log(productData);

    const updatedProduct: IProduct = await Product.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(_id) },
      {
        $set: {
          category: productData.category,
          // dateModified: (Date.now as unknown) as Date,
          subCategory: productData.subCategory,
          title: productData.title,
          variants: productData.variants,
        },
      },
      { new: true }
    );

    const { __v, ...result } = updatedProduct.toObject();

    console.log('Updated result: ');
    console.log(result);

    return result as IProduct;
  } catch (err) {
    throw new Error(err);
  }
};

export default updateProduct;
