const mongoose = require('mongoose');

const SubCategory = mongoose.Schema({
  sign: String,
  title: String,
});

module.exports = mongoose.model('SubCategory', SubCategory);
