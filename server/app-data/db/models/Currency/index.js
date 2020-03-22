const mongoose = require('mongoose');

const Currency = mongoose.Schema({
  defaultCurrency: Boolean,
  modifiedByUserId: String,
  sign: String,
  valueSetDate: Date,
  value: {
    default: 1,
    type: Number,
  },
  title: String,
});

module.exports = mongoose.model('Currency', Currency);
