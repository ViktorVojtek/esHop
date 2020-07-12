import PaymentMethode, {
  IPaymentMethode,
} from '../../../../db/models/PaymentMethode';

export default async (): Promise<IPaymentMethode[]> => {
  try {
    const exist: IPaymentMethode[] = (await PaymentMethode.find()) || [];

    return exist;
  } catch (err) {
    throw new Error(err.message);
  }
};
