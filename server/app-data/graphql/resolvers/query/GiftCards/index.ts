import GiftCard, { IGiftCard } from '../../../../db/models/GiftCard';

const giftCards: () => Promise<IGiftCard[]> = async () => {
  try {
    const result = (await GiftCard.find()) || [];

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export default giftCards;
