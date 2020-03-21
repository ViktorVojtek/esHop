const mongoose = require('mongoose');

const Currency = mongoose.Schema({
  default: Boolean,
  modifiedByUserId: String,
  sign: String,
  valueSetDate: Date,
  value: Number,
});

module.exports = mongoose.model('Currency', Currency);
