const Category = require('../../../db/models/Category');
const modError = require('../utils/error');

const createCategory = async (root, { title }, ctx) => {
  try {
    const categoryExist = await Category.findOne({ title });

    if (categoryExist) {
      throw new modError(403, 'Category allready exist');
    }

    const categoryData = {
      title,
      sign: title.toUpperCase().replace(/ /g, '_'),
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
