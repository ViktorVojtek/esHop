"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const User = apollo_server_express_1.gql `
  input UserLoginInput {
    email: String!
    password: String!
  }

  input UserRegInput {
    admin: Boolean
    email: String!
    firstName: String!
    lastName: String!
    password: String!
    role: Int
  }

  type User {
    _id: String!
    admin: Boolean!
    email: String
    firstName: String
    lastName: String
    role: Int!
  }

  type UserLogged {
    _id: String!
    admin: Boolean!
    email: String
    firstName: String
    lastName: String
    role: Int!
    token: String!
    tokenExpiresIn: Float
  }
`;
exports.default = User;
