const Order = require('../../../../db/models/Order');

const createOrder = async (root, { data }, ctx) => {
  const newOrder = new Order(data);

  await Order.create(newOrder);

  const {
    __v,
    ...result
  } = newOrder.toObject();

  return result;
};

module.exports = createOrder;