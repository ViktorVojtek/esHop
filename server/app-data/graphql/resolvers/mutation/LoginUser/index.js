const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { superSecret } = require('../../../../config');
const User = require('../../../../db/models/User');
const ModError = require('../../utils/error');

const loginUser = async (root, { userLoginInput }, ctx) => {
  try {
    const { email, password } = userLoginInput;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      throw new ModError(404, 'User not exist!');
    }

    const {
      __v,
      password: passwordHash,
      ...userData
    } = userExist.toObject();

    const passwordMatch = await bcrypt.compare(password, passwordHash);

    if (!passwordMatch) {
      throw new ModError(422, 'Incorrect input data');
    }

    const token = await jwt.sign(
      { email },
      superSecret,
      { expiresIn: '8h' },
    );

    const result = {
      ...userData,
      token,
    };

    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = loginUser;
