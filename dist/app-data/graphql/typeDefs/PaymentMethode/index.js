"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const PaymentMethode = apollo_server_express_1.gql `
  input PaymentInput {
    title: String
    value: Int
  }

  type Payment {
    _id: String
    title: String
    value: Int
  }
`;
exports.default = PaymentMethode;
