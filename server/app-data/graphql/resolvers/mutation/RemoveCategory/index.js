const mongoose = require('mongoose');
const Category = require('../../../../db/models/Category');
const { superSecret } = require('../../../../config');
const { verifyToken } = require('../../utils');
const ModError = require('../../utils/error');

const removeCategory = async (root, { _id }, ctx) => {
  try {
    await verifyToken(ctx, superSecret);

    const categoryExist = await Category.findOne({ _id: mongoose.Types.ObjectId(_id) });

    if (!categoryExist) {
      throw new ModError(404, 'Category not exist');
    }

    await Category.remove({ _id: mongoose.Types.ObjectId(_id) });

    return `Category with _id: ${_id} has been successfuly removed.`;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = removeCategory;
