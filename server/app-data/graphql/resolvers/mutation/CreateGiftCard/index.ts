import mongoose from 'mongoose';
import { storeFile } from '../../utils';
import { config } from '../../../../config';
import ModError from '../../utils/error';
import { verifyToken } from '../../utils';
import GiftCard, { IGiftCard } from '../../../../db/models/GiftCard';

const createGiftCard: (
  root: any,
  args: any,
  ctx: any
) => Promise<IGiftCard> = async (root, { giftCardInput }, ctx) => {
  try {
    const { superSecret } = config;
    await verifyToken(ctx, superSecret);

    const { image, title } = giftCardInput;

    const giftCardExist: IGiftCard = await GiftCard.findOne({ title });

    if (giftCardExist) {
      throw new ModError(403, 'GiftCard allready exist.');
    }

    const giftCardData: IGiftCard = new GiftCard(giftCardInput);

    if (image && (image as any).base64) {
      const vId = `${giftCardData._id}-${title.toUpperCase()}`;

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

      giftCardData.image = imageData;
    }

    const newSubCategory = await GiftCard.create(giftCardData);

    const { __v, ...result } = newSubCategory.toObject();

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export default createGiftCard;
