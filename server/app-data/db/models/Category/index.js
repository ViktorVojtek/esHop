const mongoose = require('mongoose');

const Category = mongoose.Schema({
  sign: String,
  title: String,
});

module.exports = mongoose.model('Category', Category);
