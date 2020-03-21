const mongoose = require('mongoose');
const Category = require('../../../db/models/Category');
const modError = require('../utils/error');

const updateCategory = async (root, { _id, title }, ctx) => {
  try {
    const categoryExist = await Category.findOne({ _id: mongoose.Types.ObjectId(_id) });

    if (!categoryExist) {
      throw new modError(404, 'Category not exist');
    }

    const sign = title.toUpperCase().replace(/ /g, '_');

    const updatedCategoryData = await Category.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(_id) },
      { $set: { sign, title } },
      { new: true }
    );

    const {
      __v,
      ...result
    } = updatedCategoryData.toObject();

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = updateCategory;
