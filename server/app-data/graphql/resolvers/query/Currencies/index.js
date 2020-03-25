const Currency = require('../../../../db/models/Currency');
const { superSecret } = require('../../../../config');
const { verifyToken } = require('../../utils');

const currencies = async (root, args, ctx) => {
  try {
    await verifyToken(ctx, superSecret);

    const result = await Currency.find() || [];

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = currencies;
