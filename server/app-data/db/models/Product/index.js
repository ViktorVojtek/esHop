const mongoose = require('mongoose');

const Product = mongoose.Schema({
  category: Object,
  currency: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateDeleted: Date,
  dateModified: Date,
  description: String,
  deleted: Boolean,
  modifiedByUserId: String,
  shortDescription: String,
  subCategory: String
  images: [Object],
  note: String,
  title: String,
});

module.exports = mongoose.model('Product', Product);
