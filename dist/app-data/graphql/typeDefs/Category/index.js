"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const Category = apollo_server_express_1.gql `
  type Category {
    _id: String!
    signFlag: String
    title: String!
  }
`;
exports.default = Category;
