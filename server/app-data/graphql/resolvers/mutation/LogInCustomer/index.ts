import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { config } from '../../../../config';
import Customer, { ICustomer } from '../../../../db/models/Customer';
import ModError from '../../utils/error';

export default async (
  root: any,
  { customerData },
  ctx: any
) => {
  try {
    const { email, password } = customerData;

    const userExist: ICustomer = await Customer.findOne({ email });

    if (!userExist) {
      throw new ModError(404, 'User not exist!');
    }

    const { __v, password: passwordHash, ...userData } = userExist.toObject();

    const passwordMatch: boolean = await bcrypt.compare(password, passwordHash);

    if (!passwordMatch) {
      throw new ModError(422, 'Incorrect input data');
    }

    const { superSecret } = config;
    const token = jwt.sign({ email }, superSecret, { expiresIn: '8h' });

    const result = {
      ...userData,
      token,
    };

    return result;
  } catch (err) {
    throw new Error(err);
  }
};
