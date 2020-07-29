import { gql } from 'apollo-server-express';

const Order = gql`
  input OrderInput {
    address: String
    city: String
    companyDVATNum: String
    companyName: String
    companyVatNum: String
    deliveryMethode: String
    email: String
    firstName: String
    lastName: String
    message: String
    optionalAddress: String
    optionalCity: String
    optionalPostalCode: String
    paymentMethode: String
    phone: String
    postalCode: String
    state: String
    totalPrice: Float
    products: [String]
  }

  type Order {
    _id: String!
    address: String
    city: String
    companyDVATNum: String
    companyName: String
    companyVatNum: String
    deliveryMethode: String
    email: String
    firstName: String
    lastName: String
    message: String
    optionalAddress: String
    optionalCity: String
    optionalPostalCode: String
    paymentMethode: String
    phone: String
    postalCode: String
    state: String
    totalPrice: Float
    products: [String]
  }
`;

export default Order;
