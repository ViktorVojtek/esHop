import bcrypt from 'bcryptjs';
import Customer from '../../../../db/models/Customer';
import ModError from '../../utils/error';

export default async (root: any, args: any, ctx: any) => {
  try {
    const {
      customerData: { email, tel, firstName, lastName, password, role },
    } = args;
    const customerExist = await Customer.findOne({ email });

    if (customerExist) {
      throw new ModError(409, 'Allready exist');
    }

    const hashedPasw = await bcrypt.hash(password, 10);

    const newUserData = {
      email,
      tel,
      firstName,
      lastName,
      password: hashedPasw,
      role,
    };

    const newCustomer = new Customer(newUserData);

    await Customer.create(newCustomer);

    const { __v, ...returnCustomerData } = newCustomer.toObject();

    console.log(returnCustomerData);

    return returnCustomerData;
  } catch (err) {
    throw new Error(err.message);
  }
};
