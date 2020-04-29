const Order = require('../../../../db/models/Order');

const orders = async () => {
  const orderItems = await Order.find() || [];

  return orderItems;
};

module.exports = orders;
