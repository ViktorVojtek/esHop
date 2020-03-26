const mongoose = require('mongoose');

const SubCategory = mongoose.Schema({
  signFlag: String,
  title: String,
});

module.exports = mongoose.model('SubCategory', SubCategory);
