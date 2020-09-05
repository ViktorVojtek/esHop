import Currency, { ICurrency } from '../../../../db/models/Currency';
import { config } from '../../../../config';
import { verifyToken } from '../../utils';
import ModError from '../../utils/error';

const setCurrency: (
  root: any,
  args: any,
  ctx: any
) => Promise<ICurrency> = async (root, { currencyInput }, ctx) => {
  try {
    const { superSecret } = config;
    await verifyToken(ctx, superSecret);

    const { title } = currencyInput;

    const currencyExist: ICurrency = await Currency.findOne({ title });

    if (currencyExist) {
      throw new ModError(403, 'Currency allready exist');
    }

    const currencyData = {
      ...currencyInput,
      flag: title.toUpperCase().replace(/ /g, '_'),
    };

    const newCurrencyData: ICurrency = new Currency(currencyData);

    await Currency.create(newCurrencyData);

    const { __v, ...result } = newCurrencyData.toObject();

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export default setCurrency;
