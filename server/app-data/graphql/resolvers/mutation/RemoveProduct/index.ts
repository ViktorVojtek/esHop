import mongoose from 'mongoose';
import path from 'path';
import Product, { IProduct } from '../../../../db/models/Product';
import { config } from '../../../../config';
import { removeDir, verifyToken } from '../../utils';
import ModError from '../../utils/error';

const removeProduct: (
  root: any,
  args: any,
  ctx: any
) => Promise<string> = async (root, { _id }, ctx) => {
  try {
    const { superSecret } = config;
    await verifyToken(ctx, superSecret);

    const productExist: IProduct = await Product.findOne({
      _id: mongoose.Types.ObjectId(_id),
    });

    if (!productExist) {
      throw new ModError(404, 'Product not exist');
    }

    await Product.deleteOne({ _id: mongoose.Types.ObjectId(_id) });

    const imagesToDelete = [];

    productExist.images.forEach((item) => {
      const itemPath = path.resolve(
        __dirname,
        `../../../../../../public/products/${
          item.path.split('/')[item.path.split('/').length - 2]
        }`
      );

      const removeItemDir = removeDir(itemPath);

      imagesToDelete.push(removeItemDir);
    });

    await Promise.all(imagesToDelete);

    return `Product with _id: ${_id} has been successfuly removed`;
  } catch (err) {
    throw new Error(err);
  }
};

export default removeProduct;
