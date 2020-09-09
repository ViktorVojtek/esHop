import mongoose from 'mongoose';
import DeliveryMethode, {
  IDeliveryMethode,
} from '../../../../db/models/DeliveryMethode';
import ModError from '../../utils/error';

const deliveryMethode: (
  root: any,
  args: { id: string },
  ctx: any
) => Promise<IDeliveryMethode> = async (root, { id }, ctx) => {
  try {
    const exist: IDeliveryMethode = await DeliveryMethode.findOne({
      _id: mongoose.Types.ObjectId(id),
    });

    if (!exist) {
      throw new ModError(404, 'Not found');
    }

    return exist;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default deliveryMethode;
