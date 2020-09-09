import mongoose from 'mongoose';
import Product, { IProduct } from '../../../../db/models/Product';
import ModError from '../../utils/error';

const product: (root: any, args: any, ctx: any) => Promise<IProduct> = async (
  root,
  { id },
  ctx
) => {
  const exist = await Product.findOne({ _id: mongoose.Types.ObjectId(id) });

  if (!exist) {
    throw new ModError(404, 'Product not exist');
  }

  return exist;
};

export default product;
