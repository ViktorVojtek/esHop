const mongoose = require('mongoose');
const SubCategory = require('../../../../db/models/SubCategory');
const { superSecret } = require('../../../../config');
const { verifyToken } = require('../../utils');
const ModError = require('../../utils/error');

const removeSubCategory = async (root, { _id }, ctx) => {
  try {
    await verifyToken(ctx, superSecret);

    const subCategoryExist = await SubCategory.findOne({ _id: mongoose.Types.ObjectId(_id) });

    if (!subCategoryExist) {
      throw new ModError(404, 'Subcategory not exist');
    }

    await SubCategory.remove({ _id: mongoose.Types.ObjectId(_id) });

    return `Subcategory with _id: ${_id} has been successfuly removed.`;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = removeSubCategory;
