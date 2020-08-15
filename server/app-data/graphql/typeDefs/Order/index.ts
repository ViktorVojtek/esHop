import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { gql } from 'apollo-server-express';

export const ObjectScalarType = new GraphQLScalarType({
  name: 'Object',
  description: 'Arbitrary object',
  parseValue: (value) => {
    return typeof value === 'object'
      ? value
      : typeof value === 'string'
      ? JSON.parse(value)
      : null;
  },
  serialize: (value) => {
    return typeof value === 'object'
      ? value
      : typeof value === 'string'
      ? JSON.parse(value)
      : null;
  },
  parseLiteral: (ast) => {
    switch (ast.kind) {
      case Kind.STRING:
        return JSON.parse(ast.value);
      case Kind.OBJECT:
        throw new Error(`Not sure what to do with OBJECT for ObjectScalarType`);
      default:
        return null;
    }
  },
});

const Order = gql`
  input OrderInput {
    userId: String
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
    products: [Object]
  }

  type Order {
    _id: String!
    userId: String
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
    products: [Object]
  }
`;

export default Order;
