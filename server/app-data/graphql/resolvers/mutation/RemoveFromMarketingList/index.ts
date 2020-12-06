import Customer from '../../../../db/models/Customer';
import MarketingList from '../../../../db/models/MarketingList';

export default async (root: any, args: any, ctx: any) => {
  try {
    const { email } = args;

    const userExist = await MarketingList.findOne({ email });

    await Customer.updateOne({ email }, { marketing: false });

    if (!userExist) {
      return;
    }

    await MarketingList.deleteOne({ email });

    return;
  } catch (err) {
    throw new Error(err.message);
  }
};
