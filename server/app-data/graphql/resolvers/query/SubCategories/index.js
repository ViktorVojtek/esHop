const SubCategory = require('../../../../db/models/SubCategory');
const { superSecret } = require('../../../../config');
const { verifyToken } = require('../../utils');

const subCategories = async (root, args, ctx) => {
  try {
    await verifyToken(ctx, superSecret);

    const result = await SubCategory.find() || [];

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = subCategories;
