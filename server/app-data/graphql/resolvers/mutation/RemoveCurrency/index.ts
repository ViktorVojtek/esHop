import mongoose from 'mongoose';
import Currency, { ICurrency } from '../../../../db/models/Currency';
import { config } from '../../../../config';
import { verifyToken } from '../../utils';
import ModError from '../../utils/error';

const removeCurrency: (
  root: any,
  args: any,
  ctx: any
) => Promise<string> = async (root, { _id }, ctx) => {
  try {
    const { superSecret } = config;
    await verifyToken(ctx, superSecret);

    const currencyExist: ICurrency = await Currency.findOne({
      _id: mongoose.Types.ObjectId(_id),
    });

    if (!currencyExist) {
      throw new ModError(404, 'Currency not exist');
    }

    await Currency.deleteOne({ _id: mongoose.Types.ObjectId(_id) });

    return `Currency with _id: ${_id} has been successfuly removed.`;
  } catch (err) {
    throw new Error(err);
  }
};

export default removeCurrency;
