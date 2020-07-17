import DeliveryMethode, {
  IDeliveryMethode,
} from '../../../../db/models/DeliveryMethode';
import ModError from '../../utils/error';

const createDeliveryMethode: (
  root: any,
  args: { isEnvelopeSize: boolean; title: string; value: number },
  ctx: any
) => Promise<IDeliveryMethode> = async (
  root,
  { isEnvelopeSize, title, value },
  ctx
) => {
  try {
    const exist: IDeliveryMethode = await DeliveryMethode.findOne({ title });

    if (exist) {
      throw new ModError(409, 'Delivery methode already exist');
    }

    const newItemData = new DeliveryMethode({ isEnvelopeSize, title, value });

    await DeliveryMethode.create(newItemData);

    const { __v, ...returnItemData } = newItemData.toObject();

    return returnItemData;
  } catch (err) {
    throw new Error(err);
  }
};

export default createDeliveryMethode;
