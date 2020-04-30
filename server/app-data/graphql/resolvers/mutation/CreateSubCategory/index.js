const mongoose = require('mongoose');
const { superSecret } = require('../../../../config');
const Category = require('../../../../db/models/Category');
const SubCategory = require('../../../../db/models/SubCategory');
const ModError = require('../../utils/error');
const { verifyToken } = require('../../utils');

const createSubCategory = async (root, { categoryId, title }, ctx) => {
  try {
    await verifyToken(ctx, superSecret);

    const categoryExist = await Category.findOne({ _id: mongoose.Types.ObjectId(categoryId) });

    if (!categoryExist) {
      throw new ModError(404, 'Category you are referencing for not exist.');
    }
    const subCategoryExist = await SubCategory.findOne({ title });

    if (subCategoryExist) {
      throw new ModError(403, 'Subcategory allready exist.');
    }

    const subCategoryData = {
      categoryId,
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
