import DeliveryMethode, {
  IDeliveryMethode,
} from '../../../../db/models/DeliveryMethode';

const deliveryMethods: () => Promise<IDeliveryMethode[]> = async () => {
  try {
    const exist: IDeliveryMethode[] = await DeliveryMethode.find({});

    return exist || [];
  } catch (err) {
    throw new Error(err.message);
  }
};

export default deliveryMethods;
