const SubCategory = require('../../../../db/models/SubCategory');

const subCategories = async (root, { categoryId }, ctx) => {
  try {
    const result = categoryId
      ? await SubCategory.find({ categoryId }) || []
      : await SubCategory.find() || [];

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = subCategories;
