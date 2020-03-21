const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { superSecret } = require('../../../../config');
const User = require('../../../../db/models/User');
const modError = require('../../utils/error');

const loginUser = async (root, { userLoginInput }, ctx) => {
  try {
    const { email, password } = userLoginInput;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      throw new modError(404, 'User not exist!');
    }

    const {
      __v,
      password: passwordHash,
      ...userData
    } = userExist.toObject();
    
    const passwordMatch = await bcrypt.compare(password, passwordHash);

    if (!passwordMatch) {
      throw new modError(422, 'Incorrect input data');
    }

    const token = await jwt.sign(
      { email },
      superSecret,
      { expiresIn: '8h' },
    );

    const now = new Date();
    const time = now.setHours(now.getHours() + 8);
    const future = new Date(time);
    const timestamp = future.getTime();

    const result = {
      ...userData,
      token,
      tokenExpiresIn: timestamp,
    };
  
    return result;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = loginUser;
