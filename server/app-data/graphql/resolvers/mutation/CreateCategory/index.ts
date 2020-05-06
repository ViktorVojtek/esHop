import { config } from '../../../../config';
import Category, { ICategory } from '../../../../db/models/Category';
import ModError from '../../utils/error';
import { verifyToken } from '../../utils';

const createCategory: (
  root: any,
  args: any,
  ctx: any
) => Promise<ICategory> = async (root, { title }, ctx) => {
  try {
    const { superSecret } = config;
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

    const { __v, ...result } = newCategory.toObject();

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export default createCategory;
