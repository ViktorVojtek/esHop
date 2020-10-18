"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
  input CustomerLoginInput {
    email: String!
    password: String!
  }

  input CustomerRegInput {
    email: String!
    tel: String!
    firstName: String!
    lastName: String!
    password: String!
    role: Int
  }

  type Customer {
    _id: String!
    customerPoints: Float
    email: String
    tel: String
    firstName: String
    lastName: String
    role: Int!
  }

  type CustomerLogged {
    _id: String!
    customerPoints: Float
    email: String
    tel: String
    firstName: String
    lastName: String
    role: Int!
    token: String!
    tokenExpiresIn: Float
  }
`;
