import mongoose from 'mongoose';
import { storeFile } from '../../utils';
import { config } from '../../../../config';
import Category, { ICategory } from '../../../../db/models/Category';
import SubCategory, { ISubCategory } from '../../../../db/models/SubCategory';
import ModError from '../../utils/error';
import { verifyToken } from '../../utils';

const createSubCategory: (
  root: any,
  args: any,
  ctx: any
) => Promise<ISubCategory> = async (root, { subCategoryInput }, ctx) => {
  try {
    const { superSecret } = config;
    await verifyToken(ctx, superSecret);

    const {
      image,
      categoryId,
      title,
      ...restSubCategoryData
    } = subCategoryInput;

    const categoryExist: ICategory = await Category.findOne({
      _id: mongoose.Types.ObjectId(categoryId),
    });

    if (!categoryExist) {
      throw new ModError(404, 'Category you are referencing for not exist.');
    }
    const subCategoryExist: ISubCategory = await SubCategory.findOne({ title });

    if (subCategoryExist) {
      throw new ModError(403, 'Subcategory allready exist.');
    }

    const subCategoryData: ISubCategory = new SubCategory(restSubCategoryData);

    if (image && (image as any).base64) {
      const vId = `${subCategoryData._id}-${title.toUpperCase()}`;

      const fileData = {
        fileName: (image as any).title,
        fileBase64Data: (image as any).base64,
        dirName: vId,
        extension: (image as any).ext,
      };

      const imgPath = await storeFile(fileData);

      const { base64, ...restImgData } = image as any;
      const imageData = {
        ...restImgData,
        path: imgPath,
      };

      subCategoryData.image = imageData;
    }

    subCategoryData.title = title;
    subCategoryData.signFlag = title.toUpperCase().replace(/ /g, '_');
    subCategoryData.categoryId = categoryId;

    const newSubCategory = await SubCategory.create(subCategoryData);

    const { __v, ...result } = newSubCategory.toObject();

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export default createSubCategory;
