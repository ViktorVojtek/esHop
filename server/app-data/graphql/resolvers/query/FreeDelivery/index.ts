import FreeDelivery, {
  IFreeDelivery,
} from '../../../../db/models/FreeDelivery';

const freeDeliveries: () => Promise<IFreeDelivery[]> = async () => {
  try {
    const items: IFreeDelivery[] = await FreeDelivery.find({});

    return items || [];
  } catch (err) {
    throw new Error(err.message);
  }
};

export default freeDeliveries;
