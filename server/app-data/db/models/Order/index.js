const mongoose = require('mongoose');

const Order = mongoose.Schema({
  customer: {
    address: {
      city: String,
      state: String,
      street: String,
      postcode: String,
    },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
  },
  paymentMethod: {
    type: String,
    enum: ['CARD', 'CASH_ON_DELIVERY'],
    default: 'CARD',
  },
  products: [Object],
});

module.exports = mongoose.model('Order', Order);
