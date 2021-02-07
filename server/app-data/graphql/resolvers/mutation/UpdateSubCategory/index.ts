/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import SubCategory, { ISubCategory } from '../../../../db/models/SubCategory';
import { config } from '../../../../config';
import { verifyToken, storeFile, getVariantImagesPaths } from '../../utils';
import ModError from '../../utils/error';

const updateSubCategory: (
  root: any,
  args: any,
  ctx: any
) => Promise<ISubCategory> = async (root, { _id, subCategoryInput }, ctx) => {
  try {
    const { superSecret } = config;
    await verifyToken(ctx, superSecret);

    console.log(_id);
    console.log(subCategoryInput);

    const subCategoryExist: ISubCategory = await SubCategory.findOne({
      _id: mongoose.Types.ObjectId(_id),
    });

    if (!subCategoryExist) {
      throw new ModError(404, 'Subcategory not exist.');
    }

    const {
      title,
      categoryId,
      image,
      forReservation,
      forSale,
      forGiftCard,
      forGiftBasket,
    } = subCategoryInput;

    let newImage = {};

    if ((image as any).base64) {
      const vId = `${_id}-${title.toUpperCase()}`;

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

      newImage = imageData;
    }

    const updatedSubCategory: ISubCategory = await SubCategory.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(_id) },
      {
        $set: {
          title,
          categoryId,
          image: newImage,
          forReservation,
          forSale,
          forGiftCard,
          forGiftBasket,
        },
      },
      { new: true }
    );

    const { __v, ...result } = updatedSubCategory.toObject();

    return result as ISubCategory;
  } catch (err) {
    throw new Error(err);
  }
};

export default updateSubCategory;
