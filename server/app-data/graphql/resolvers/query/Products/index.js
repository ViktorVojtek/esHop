const Product = require('../../../../db/models/Product');
const { superSecret } = require('../../../../config');
const { verifyToken } = require('../../utils');

const categories = async (root, args, ctx) => {
  try {
    await verifyToken(ctx, superSecret);

    const result = await Product.find() || [];

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = categories;
