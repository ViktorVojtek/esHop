const mongoose = require('mongoose');

const User = mongoose.Schema({
  admin: {
    default: false,
    type: Boolean,
  },
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  role: {
    default: 1,
    type: Number,
  },
});

module.exports = mongoose.model('User', User);
