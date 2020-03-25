const { superSecret } = require('../../../../config');
const Category = require('../../../../db/models/Category');
const ModError = require('../../utils/error');
const { verifyToken } = require('../../utils');

const createCategory = async (root, { title }, ctx) => {
  try {
    await verifyToken(ctx, superSecret);

    const categoryExist = await Category.findOne({ title });

    if (categoryExist) {
      throw new ModError(403, 'Category allready exist');
    }

    const categoryData = {
      title,
      signFlag: title.toUpperCase().replace(/ /g, '_'),
    };

    const newCategory = new Category(categoryData);

    await Category.create(newCategory);

    const {
      __v,
      ...result
    } = newCategory.toObject();

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = createCategory;
