import PaymentMethode, {
  IPaymentMethode,
} from '../../../../db/models/PaymentMethode';
import ModError from '../../utils/error';

const createDeliveryMethode: (
  root: any,
  args: { title: string; value: number },
  ctx: any
) => Promise<IPaymentMethode> = async (root, { title, value }, ctx) => {
  try {
    const exist: IPaymentMethode = await PaymentMethode.findOne({ title });

    if (exist) {
      throw new ModError(409, 'Payment methode already exist');
    }

    const newItemData = new PaymentMethode({ title, value });

    await PaymentMethode.create(newItemData);

    const { __v, ...returnItemData } = newItemData.toObject();

    return returnItemData;
  } catch (err) {
    throw new Error(err);
  }
};

export default createDeliveryMethode;
