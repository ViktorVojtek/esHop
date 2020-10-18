"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const Currency = apollo_server_express_1.gql `
  input CurrencyInput {
    defaultCurrency: Boolean!
    modifiedByUserId: String
    sign: String!
    value: Float
    title: String!
  }

  input CurrencyUpdateInput {
    _id: String
    defaultCurrency: Boolean
    modifiedByUserId: String
    value: Float
  }

  type Currency {
    _id: String!
    defaultCurrency: Boolean
    flag: String
    modifiedByUserId: String
    sign: String
    valueSetDate: String
    value: Float
    title: String
  }
`;
exports.default = Currency;
