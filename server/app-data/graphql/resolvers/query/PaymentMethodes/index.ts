import PaymentMethode, {
  IPaymentMethode,
} from '../../../../db/models/PaymentMethode';

const paymentMethodes: () => Promise<IPaymentMethode[]> = async () => {
  try {
    const exist: IPaymentMethode[] = (await PaymentMethode.find()) || [];

    return exist;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default paymentMethodes;
