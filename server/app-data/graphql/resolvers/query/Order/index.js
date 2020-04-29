const mongoose = require('mongoose');
const Order = require('../../../../db/models/Order');
const ModError = require('../../utils/error');

const order = async (root, { _id }, ctx) => {
  const orderExist = await Order.findOne({ _id: mongoose.Types.ObjectId(_id) });

  if(!orderExist) {
    throw new ModError(404, `No order with id: ${_id} has been found`);
  }

  return orderExist;
};

module.exports = order;