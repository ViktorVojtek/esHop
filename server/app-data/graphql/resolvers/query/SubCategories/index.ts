import SubCategory, { ISubCategory } from '../../../../db/models/SubCategory';

const subCategories: (
  root: any,
  args: any,
  ctx: any
) => Promise<ISubCategory[]> = async (root, { categoryId }, ctx) => {
  try {
    const result = categoryId
      ? (await SubCategory.find({ categoryId })) || []
      : (await SubCategory.find()) || [];

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export default subCategories;
