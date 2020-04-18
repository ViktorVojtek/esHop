const mongoose = require('mongoose');
const path = require('path');
const Product = require('../../../../db/models/Product');
const { superSecret } = require('../../../../config');
const { removeDir, verifyToken } = require('../../utils');
const ModError = require('../../utils/error');

const removeProduct = async (root, { _id }, ctx) => {
  try {
    await verifyToken(ctx, superSecret);

    const productExist = await Product.findOne({
      _id: mongoose.Types.ObjectId(_id),
    });

    if (!productExist) {
      throw new ModError(404, 'Product not exist');
    }

    await Product.deleteOne({ _id: mongoose.Types.ObjectId(_id) });

    const imagesToDelete = [];

    productExist.images.forEach((item) => {
      const itemPath = path.resolve(
        __dirname,
        `../../../../../../public/products/${
          item.path.split('/')[item.path.split('/').length - 2]
        }`
      );

      const removeItemDir = removeDir(itemPath);

      imagesToDelete.push(removeItemDir);
    });

    await Promise.all(imagesToDelete);

    return `Product with _id: ${_id} has been successfuly removed`;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = removeProduct;
