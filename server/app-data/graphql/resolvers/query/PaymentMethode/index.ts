import mongoose from 'mongoose';
import PaymentMethode, {
  IPaymentMethode,
} from '../../../../db/models/PaymentMethode';
import ModError from '../../utils/error';

const paymentMethode: (
  root: any,
  args: { id: string },
  ctx: any
) => Promise<IPaymentMethode> = async (root, { id }, ctx) => {
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

export default paymentMethode;
