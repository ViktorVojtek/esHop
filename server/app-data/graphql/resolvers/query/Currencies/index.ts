import Currency, { ICurrency } from '../../../../db/models/Currency';

const currencies: () => Promise<ICurrency[]> = async () => {
  try {
    const result = (await Currency.find()) || [];

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export default currencies;
