const { superSecret } = require('../../../../config');
const SubCategory = require('../../../../db/models/SubCategory');
const ModError = require('../../utils/error');
const { verifyToken } = require('../../utils');

const createSubCategory = async (root, { title }, ctx) => {
  try {
    await verifyToken(ctx, superSecret);

    const categoryExist = await SubCategory.findOne({ title });

    if (categoryExist) {
      throw new ModError(403, 'Category allready exist');
    }

    const subCategoryData = {
      title,
      signFlag: title.toUpperCase().replace(/ /g, '_'),
    };

    const newSubCategory = new SubCategory(subCategoryData);

    await SubCategory.create(newSubCategory);

    const {
      __v,
      ...result
    } = newSubCategory.toObject();

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = createSubCategory;
