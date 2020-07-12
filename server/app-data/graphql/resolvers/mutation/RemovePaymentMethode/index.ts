import mongoose from 'mongoose';
import PaymentMethode, {
  IPaymentMethode,
} from '../../../../db/models/PaymentMethode';
import ModErr from '../../utils/error';

export default async (
  root: any,
  { id }: { id: string },
  ctx: any
): Promise<string> => {
  try {
    const exist: IPaymentMethode = await PaymentMethode.findOne({
      _id: mongoose.Types.ObjectId(id),
    });

    if (!exist) {
      throw new ModErr(404, 'Not found');
    }

    await PaymentMethode.deleteOne({ _id: mongoose.Types.ObjectId(id) });

    return `Payment method with id: ${id} has been sucessfuly deleted.`;
  } catch (err) {
    throw new Error(err.message);
  }
};
