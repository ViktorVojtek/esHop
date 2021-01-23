import Product, { IProduct } from '../../../../db/models/Product';
import ModError from '../../utils/error';

const productBySlug: (
  root: any,
  args: any,
  ctx: any
) => Promise<IProduct> = async (root, { slug }, ctx) => {
  const product = await Product.findOne({ slug });

  if (!product) {
    throw new ModError(404, 'Product not exist');
  }

  return product;
};

export default productBySlug;
