import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { config } from '../../../../config';
import Customer, { ICustomer } from '../../../../db/models/Customer';
import { validateHuman } from '../../utils';
import ModError from '../../utils/error';

export default async (root: any, { customerData }, ctx: any) => {
  try {
    const { email, password, recaptchaToken } = customerData;

    const userExist: ICustomer = await Customer.findOne({ email });

    if (!userExist) {
      throw new ModError(404, 'User not exist!');
    }

    const human = await validateHuman(recaptchaToken);

    console.log(human);

    if (!human) {
      throw new ModError(400, 'You are robot!');
    }

    const { __v, password: passwordHash, ...userData } = userExist.toObject();

    const passwordMatch: boolean = await bcrypt.compare(password, passwordHash);

    if (!passwordMatch) {
      throw new ModError(422, 'Incorrect input data');
    }

    if (!userExist.isVerified) {
      throw new ModError(544, 'Email address is not verified');
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
