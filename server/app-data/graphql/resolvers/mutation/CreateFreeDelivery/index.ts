import FreeDelivery, {
  IFreeDelivery,
} from '../../../../db/models/FreeDelivery';
import ModError from '../../utils/error';

const createFreeDelivery: (
  root: any,
  args: { value: number },
  ctx: any
) => Promise<IFreeDelivery> = async (root, { value }, ctx) => {
  try {
    const exist: IFreeDelivery = await FreeDelivery.findOne({ value });

    if (exist) {
      throw new ModError(409, 'Item allready exist.');
    }

    const newItem: IFreeDelivery = new FreeDelivery({ value });

    await FreeDelivery.create(newItem);

    const { __v, ...returnItem } = newItem.toObject();

    return returnItem;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default createFreeDelivery;
