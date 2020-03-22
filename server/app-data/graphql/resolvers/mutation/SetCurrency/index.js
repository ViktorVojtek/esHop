const Currency = require('../../../../db/models/Currency');
const { superSecret } = require('../../../../config');
const { verifyToken } = require('../../utils');
const modError = require('../../utils/error');

const setCurrency = async (root, { currencyInput }, ctx) => {
  try {
    await verifyToken(ctx, superSecret);

    const {
      defaultCurrency, modifiedByUserId, sign, value, title,
    } = currencyInput;

    const currencyExist = await Currency.findOne({ title });

    if (currencyExist) {
      throw new modError(403, 'Currency allready exist');
    }

    const currencyData = {
      ...currencyInput,
      flag: title.toUpperCase().replace(/ /g, '_'),
    }

    const newCurrencyData = new Currency(currencyData);

    await Currency.create(newCurrencyData);

    const {
      __v,
      ...result
    } = newCurrencyData.toObject();

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = setCurrency;
