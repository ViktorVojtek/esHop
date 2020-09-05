import Discount, { IDiscount } from '../../../../db/models/Discount';

const discounts: () => Promise<IDiscount[]> = async () => {
  try {
    const items: IDiscount[] = await Discount.find({});

    return items || [];
  } catch (err) {
    throw new Error(err.message);
  }
};

export default discounts;
