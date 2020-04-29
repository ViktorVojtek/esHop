const { gql } = require('apollo-server-express');

const Order = gql`
  enum PaymentMethodEnum {
    CARD
    CASH_ON_DELIVERY
  }

  input OrderCustomerAddressInput {
    city: String
    state: String
    street: String
    postcode: String
  }

  input OrderCustomerInput {
    address: OrderCustomerAddressInput
    firstName: String
    lastName: String
    email: String
    phone: String
  }

  input OrderInput {
    customer: OrderCustomerInput
    paymentMethod: PaymentMethodEnum,
    products: [ProductInput],
  }


  type OrderCustomerAddress {
    city: String
    state: String
    street: String
    postcode: String
  }

  type OrderCustomer {
    address: OrderCustomerAddress
    firstName: String
    lastName: String
    email: String
    phone: String
  }

  type Order {
    customer: OrderCustomer
    paymentMethod: PaymentMethodEnum,
    products: [Product],
  }
`;

module.exports = Order;
