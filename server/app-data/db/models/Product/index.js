const mongoose = require('mongoose');

const Product = mongoose.Schema({
  category: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateDeleted: Date,
  dateModified: Date,
  description: String,
  deleted: {
    default: false,
    type: Boolean,
  },
  inStock: Boolean,
  modifiedByUserId: String,
  shortDescription: String,
  subCategory: String,
  images: [Object],
  note: String,
  title: String,
  variant: [Object],
});

module.exports = mongoose.model('Product', Product);
