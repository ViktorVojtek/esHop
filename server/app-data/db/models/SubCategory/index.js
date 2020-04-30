const mongoose = require('mongoose');

const SubCategory = mongoose.Schema({
  categoryId: String,
  signFlag: String,
  title: String,
});

module.exports = mongoose.model('SubCategory', SubCategory);
