const mongoose = require('mongoose');
const Product = require('../../../../db/models/Product');
const ModError = require('../../utils/error');

const product = async (root, { id }, ctx) => {
  const exist = await Product.findOne({ _id: mongoose.Types.ObjectId(id) });

  if (!exist) {
    throw new ModError(404, 'Product not exist'); 
  }

  return exist;
};

module.exports = product;