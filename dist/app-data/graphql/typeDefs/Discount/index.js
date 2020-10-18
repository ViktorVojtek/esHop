"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const Discount = apollo_server_express_1.gql `
  input DiscountInput {
    code: String
    value: Int
  }

  type Discount {
    _id: String
    code: String
    value: Int
  }
`;
exports.default = Discount;
