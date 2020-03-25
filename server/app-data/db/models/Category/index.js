const mongoose = require('mongoose');

const Category = mongoose.Schema({
  signFlag: String,
  title: String,
});

module.exports = mongoose.model('Category', Category);
