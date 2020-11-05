import Customer from '../../../../db/models/Customer';
import MarketingList from '../../../../db/models/MarketingList';

export default async (root: any, args: any, ctx: any) => {
  try {
    const {
      marketingListData: { email, tel, firstName, lastName },
    } = args;

    const newUserData = {
      email,
      tel,
      firstName,
      lastName,
    };

    const userExist = await MarketingList.findOne({ email });

    if (userExist) {
      return;
    }

    await Customer.updateOne({ email }, { marketing: true });

    const newCustomer = new MarketingList(newUserData);

    await MarketingList.create(newCustomer);

    const { __v, ...returnCustomerData } = newCustomer.toObject();

    return returnCustomerData;
  } catch (err) {
    throw new Error(err.message);
  }
};
