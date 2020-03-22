const mongoose = require('mongoose');
const Product = require('../../../../db/models/Product');
const { superSecret } = require('../../../../config');
const { verifyToken, storeFile } = require('../../utils');
const modError = require('../../utils/error');

const removeProduct = async (root, { _id }, ctx) => {
  try {
    const productExist = await Product.findOne({ _id: mongoose.Types.ObjectId(_id) });

    if (!productExist) {
      throw new modError(404, 'Product not exist');
    }

    await Product.remove({ _id: mongoose.Types.ObjectId(_id) });

    return `Product with _id: ${_id} has been successfuly removed`;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = removeProduct;