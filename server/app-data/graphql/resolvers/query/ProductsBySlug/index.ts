import Product, { IProduct } from '../../../../db/models/Product';
import SubCategory, { ISubCategory } from '../../../../db/models/SubCategory';
import ModError from '../../utils/error';

type ProductPromise = {
  product: IProduct;
  subCategory: ISubCategory;
};

const productBySlug: (
  root: any,
  args: any,
  ctx: any
) => Promise<ProductPromise> = async (root, { slug }, ctx) => {
  const product = await Product.findOne({ slug });

  if (!product) {
    throw new ModError(404, 'Product not exist');
  }
  const subCategory = await SubCategory.findOne({
    _id: product.subCategory.id,
  });
  if (!subCategory) {
    throw new ModError(404, 'Product not exist');
  }

  return { product, subCategory };
};

export default productBySlug;
