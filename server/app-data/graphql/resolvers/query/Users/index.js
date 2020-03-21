const User = require('../../../../db/models/User');

const users = async () => {
  try {
    return await User.find() || [];
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = users;
