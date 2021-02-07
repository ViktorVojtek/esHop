import mongoose from 'mongoose';
import { config } from '../../../../config';
import GiftCard, { IGiftCard } from '../../../../db/models/GiftCard';
import { verifyToken } from '../../utils';
import ModError from '../../utils/error';

const removeGiftCard: (
  root: any,
  args: any,
  ctx: any
) => Promise<string> = async (root, { _id }, ctx) => {
  try {
    const { superSecret } = config;
    await verifyToken(ctx, superSecret);

    const giftCardExist: IGiftCard = await GiftCard.findOne({
      _id: mongoose.Types.ObjectId(_id),
    });

    if (!giftCardExist) {
      throw new ModError(404, 'Subcategory not exist');
    }

    await GiftCard.deleteOne({ _id: mongoose.Types.ObjectId(_id) });

    return `GiftCard with _id: ${_id} has been successfuly removed.`;
  } catch (err) {
    throw new Error(err);
  }
};

export default removeGiftCard;
