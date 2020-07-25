import Customer from '../../../../db/models/Customer';
import ModError from '../../utils/error';

export default async (root: any, args: any, ctx: any) => {
  try {
    const { customerData: { email, firstName, lastName, password, role } } = args;
    const customerExist = await Customer.findOne({ email });

    if (customerExist) {
      throw new ModError(409, 'Allready exist');
    }

    const newCustomer = new Customer({
      email,
      firstName,
      lastName,
      password,
      role
    });

    await Customer.create(newCustomer);

    const { __v, ...returnCustomerData } = newCustomer;

    return returnCustomerData;
  } catch (err) {
    throw new Error(err.message);
  }
};
