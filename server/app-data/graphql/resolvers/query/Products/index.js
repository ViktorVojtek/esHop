const Product = require('../../../../db/models/Product');

const Products = async () => {
  try {
    const result = await Product.find() || [];

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = Products;
