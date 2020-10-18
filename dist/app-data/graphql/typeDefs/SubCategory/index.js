"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const SubCategory = apollo_server_express_1.gql `
  type SubCategory {
    _id: String!
    categoryId: String!
    signFlag: String
    title: String!
  }
`;
exports.default = SubCategory;
