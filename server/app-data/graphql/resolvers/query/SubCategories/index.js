const SubCategory = require('../../../../db/models/SubCategory');

const subCategories = async () => {
  try {
    const result = await SubCategory.find() || [];

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = subCategories;
