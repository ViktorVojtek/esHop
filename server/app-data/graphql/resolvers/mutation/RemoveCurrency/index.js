const mongoose = require('mongoose');
const Currency = require('../../../../db/models/Currency');
const { superSecret } = require('../../../../config');
const { verifyToken } = require('../../utils');
const modError = require('../../utils/error');

const removeCurrency = async (root, { _id }, ctx) => {
  try {
    await verifyToken(ctx, superSecret);

    const currencyExist = await Currency.find({ _id: mongoose.Types.ObjectId(_id) });

    if (!currencyExist) {
      throw new modError(404, 'Currency not exist');
    }

    await Currency.remove({ _id: mongoose.Types.ObjectId(_id) });

    return `Currency with _id: ${_id} has been successfuly removed.`;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = removeCurrency;
