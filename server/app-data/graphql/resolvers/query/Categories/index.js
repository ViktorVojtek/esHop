const Category = require('../../../../db/models/Category');
const modError = require('../../utils/error');

const categories = async () => {
  try {
    const result = await Category.find() || [];

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = categories;
