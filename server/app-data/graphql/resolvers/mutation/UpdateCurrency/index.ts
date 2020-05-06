import mongoose from 'mongoose';
import Currency, { ICurrency } from '../../../../db/models/Currency';
import { config } from '../../../../config';
import { verifyToken } from '../../utils';
import ModError from '../../utils/error';

const updateCurrency: (
  root: any,
  args: any,
  ctx: any
) => Promise<ICurrency> = async (root, { updateCurrencyInput }, ctx) => {
  try {
    const { superSecret } = config;
    await verifyToken(ctx, superSecret);

    const {
      _id,
      defaultCurrency,
      modifiedByUserId,
      value,
    } = updateCurrencyInput;

    const currencyExist: ICurrency = await Currency.findOne({
      _id: mongoose.Types.ObjectId(_id),
    });

    if (!currencyExist) {
      throw new ModError(404, 'Currency not exist');
    }

    const updatedCurrency: ICurrency = await Currency.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(_id) },
      {
        $set: {
          defaultCurrency,
          modifiedByUserId,
          value,
        },
      },
      { new: true }
    );

    const { __v, ...result } = updatedCurrency.toObject();

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

export default updateCurrency;
