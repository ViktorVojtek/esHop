const mongoose = require('mongoose');
const Currency = require('../../../../db/models/Currency');
const { superSecret } = require('../../../../config');
const { verifyToken } = require('../../utils');
const ModError = require('../../utils/error');

const updateCurrency = async (root, { updateCurrencyInput }, ctx) => {
  try {
    await verifyToken(ctx, superSecret);

    const {
      _id, defaultCurrency, modifiedByUserId, value,
    } = updateCurrencyInput;

    const currencyExist = await Currency.findOne({ _id: mongoose.Types.ObjectId(_id) });

    if (!currencyExist) {
      throw new ModError(404, 'Currency not exist');
    }

    const updatedCurrency = await Currency.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(_id) },
      {
        $set: {
          defaultCurrency,
          modifiedByUserId,
          value,
        },
      },
      { new: true },
    );

    const {
      __v,
      ...result
    } = updatedCurrency.toObject();

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = updateCurrency;
