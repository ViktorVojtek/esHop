const Currency = require('../../../../db/models/Currency');

const currencies = async () => {
  try {
    const result = await Currency.find() || [];

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = currencies;
