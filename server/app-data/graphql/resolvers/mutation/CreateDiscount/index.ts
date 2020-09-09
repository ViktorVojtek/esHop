import Discount, { IDiscount } from '../../../../db/models/Discount';
import ModError from '../../utils/error';

const createDiscount: (
  root: any,
  args: { code: string; value: number },
  ctx: any
) => Promise<IDiscount> = async (root, { code, value }, ctx) => {
  try {
    const exist: IDiscount = await Discount.findOne({ value });

    if (exist) {
      throw new ModError(409, 'Item allready exist.');
    }

    const newItem: IDiscount = new Discount({ code, value });

    await Discount.create(newItem);

    const { __v, ...returnItem } = newItem.toObject();

    return returnItem;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default createDiscount;
