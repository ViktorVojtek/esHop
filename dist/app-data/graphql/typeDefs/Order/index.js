"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const language_1 = require("graphql/language");
const apollo_server_express_1 = require("apollo-server-express");
exports.ObjectScalarType = new graphql_1.GraphQLScalarType({
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
            case language_1.Kind.STRING:
                return JSON.parse(ast.value);
            case language_1.Kind.OBJECT:
                throw new Error(`Not sure what to do with OBJECT for ObjectScalarType`);
            default:
                return null;
        }
    },
});
const Order = apollo_server_express_1.gql `
  input OrderInput {
    userId: String
    address: String
    city: String
    companyDVATNum: String
    companyDTAXNum: String
    companyName: String
    companyVatNum: String
    created_at: String
    deliveryMethode: String
    deliveryPrice: Float
    email: String
    firstName: String
    lastName: String
    message: String
    orderId: String
    invoiceId: String
    optionalAddress: String
    optionalCity: String
    optionalState: String
    optionalPostalCode: String
    paymentMethode: String
    phone: String
    postalCode: String
    state: String
    status: Int
    totalPrice: Float
    products: [Object]
  }

  type Order {
    _id: String!
    userId: String
    address: String
    city: String
    companyDVATNum: String
    companyDTAXNum: String
    companyName: String
    companyVatNum: String
    created_at: String
    deliveryMethode: String
    deliveryPrice: Float
    email: String
    firstName: String
    invoiceId: String
    lastName: String
    message: String
    orderId: String
    optionalAddress: String
    optionalCity: String
    optionalState: String
    optionalPostalCode: String
    paymentMethode: String
    phone: String
    postalCode: String
    state: String
    status: Int
    totalPrice: Float
    products: [Object]
  }
`;
exports.default = Order;
