import mongoose from 'mongoose';
import Product, { IProduct } from '../../../../db/models/Product';
import ModError from '../../utils/error';

const productsByIds: (
  root: any,
  args: any,
  ctx: any
) => Promise<IProduct[]> = async (root, { ids }, ctx) => {
  const result = await Product.find({ _id: { $in: ids } });

  if (!result) {
    throw new ModError(404, 'Product not exist');
  }
  return result;
};

export default productsByIds;
