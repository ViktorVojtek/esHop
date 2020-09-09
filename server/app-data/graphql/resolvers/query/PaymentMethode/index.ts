import mongoose from 'mongoose';
import PaymentMethode, {
  IPaymentMethode,
} from '../../../../db/models/PaymentMethode';
import ModError from '../../utils/error';

export default async (root: any, { id }: { id: string }, ctx: any) => {
  try {
    const exist: IPaymentMethode = await PaymentMethode.findOne({
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
