import Category, { ICategory } from '../../../../db/models/Category';

const categories: () => Promise<ICategory[]> = async () => {
  try {
    const result = (await Category.find()) || [];

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export default categories;
