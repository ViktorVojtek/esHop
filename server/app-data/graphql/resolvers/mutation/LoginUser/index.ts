import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { config } from '../../../../config';
import User, { IUser } from '../../../../db/models/User';
import ModError from '../../utils/error';

const loginUser: (root: any, args: any, ctx: any) => Promise<any> = async (
  root,
  { userLoginInput },
  ctx
) => {
  try {
    const { email, password } = userLoginInput;

    const userExist: IUser = await User.findOne({ email });

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

export default loginUser;
