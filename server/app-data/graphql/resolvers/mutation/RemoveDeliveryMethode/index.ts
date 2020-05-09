import mongoose from 'mongoose';
import DeliveryMethode, {
  IDeliveryMethode,
} from '../../../../db/models/DeliveryMethode';
import ModErr from '../../utils/error';

const removeDeliveryMethode: (
  root: any,
  args: { id: string },
  ctx: any
) => Promise<string> = async (root, { id }, ctx) => {
  try {
    const exist: IDeliveryMethode = await DeliveryMethode.findOne({
      _id: mongoose.Types.ObjectId(id),
    });

    if (!exist) {
      throw new ModErr(404, 'Not found');
    }

    await DeliveryMethode.deleteOne({ _id: mongoose.Types.ObjectId(id) });

    return `Delivery method with id: ${id} has been sucessfuly deleted.`;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default removeDeliveryMethode;
