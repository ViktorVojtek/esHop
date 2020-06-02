/* eslint-disable no-nested-ternary */
import Product, { IProduct } from '../../../../db/models/Product';

const Products: (
  root: any,
  args: any,
  ctx: any
) => Promise<IProduct[]> = async (root, { categoryId, subCategoryId }, ctx) => {
  try {
    const result = subCategoryId
      ? (await Product.find({ 'subCategory.id': subCategoryId })) || []
      : categoryId
      ? (await Product.find({ 'category.id': categoryId })) || []
      : (await Product.find()) || [];

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export default Products;
