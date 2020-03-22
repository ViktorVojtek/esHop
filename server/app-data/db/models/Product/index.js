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
  discount: Number,
  inStock: Number,
  modifiedByUserId: String,
  shortDescription: String,
  subCategory: String,
  images: [Object],
  note: String,
  price: Object,
  title: String,
});

module.exports = mongoose.model('Product', Product);
