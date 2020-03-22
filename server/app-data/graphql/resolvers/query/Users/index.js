const User = require('../../../../db/models/User');
const { superSecret } = require('../../../../config');
const { verifyToken } = require('../../utils');

const users = async (root, args, ctx) => {
  try {
    await verifyToken(ctx, superSecret);
  
    const result = await User.find() || [];

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = users;
