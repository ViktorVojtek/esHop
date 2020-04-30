/* eslint-disable no-nested-ternary */
const Product = require('../../../../db/models/Product');

const Products = async (root, { categoryId, subCategoryId }, ctx) => {
  try {
    const result = subCategoryId
      ? await Product.find({ subCategory: subCategoryId }) || []
      : (
        categoryId
          ? await Product.find({ category: categoryId }) || []
          : await Product.find() || []
      );

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = Products;
