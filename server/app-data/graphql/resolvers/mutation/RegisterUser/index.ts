import bcrypt from 'bcryptjs';

import User, { IUser } from '../../../../db/models/User';
import modError from '../../utils/error';

const registerUser: (root, { userRegInput }, ctx) => Promise<IUser> = async (
  root,
  { userRegInput },
  ctx
) => {
  try {
    const { email } = userRegInput;

    const userExist: IUser = await User.findOne({ email });

    if (userExist) {
      throw new modError(403, 'User allready exist!');
    }

    const hashedPasw = await bcrypt.hash(userRegInput.password, 10);

    const newUserData = {
      ...userRegInput,
      password: hashedPasw,
    };

    const userData = new User(newUserData);

    await User.create(userData);

    const { __v, password, ...resultUserData } = userData.toObject();

    return resultUserData;
  } catch (err) {
    throw new Error(err);
  }
};

export default registerUser;
