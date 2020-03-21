const bcrypt = require('bcryptjs');

const User = require('../../../db/models/User');
const modError = require('../utils/error');

const registerUser = async (root, { userRegInput }, ctx) => {
  try {
    const { email } = userRegInput;

    const userExist = await User.findOne({ email });

    if (userExist) {
      throw new modError(403, 'User allready exist!');
    }

    const hashedPasw = await bcrypt.hash(userRegInput.password, 10);

    const newUserData = {
      ...userRegInput,
      password: hashedPasw
    };

    const userData = new User(newUserData);

    await User.create(userData);

    const {
      __v,
      password,
      ...resultUserData
    } = userData.toObject();

    return resultUserData;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = registerUser;
