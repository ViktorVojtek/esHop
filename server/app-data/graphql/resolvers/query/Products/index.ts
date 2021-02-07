/* eslint-disable no-nested-ternary */
import Product, { IProduct } from '../../../../db/models/Product';
import SubCategory, { ISubCategory } from '../../../../db/models/SubCategory';

type ProductsPromise = {
  products: IProduct[];
  subCategories: ISubCategory[];
};

const Products: (
  root: any,
  args: any,
  ctx: any
) => Promise<ProductsPromise> = async (
  root,
  { categoryId, subCategoryId },
  ctx
) => {
  try {
    const products = subCategoryId
      ? (await Product.find({ 'subCategory.id': subCategoryId })) || []
      : categoryId
      ? (await Product.find({ 'category.id': categoryId })) || []
      : (await Product.find()) || [];

    const subCategories = (await SubCategory.find()) || [];

    return { products, subCategories };
  } catch (err) {
    throw new Error(err);
  }
};

export default Products;
