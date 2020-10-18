"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const DeliveryMethode = apollo_server_express_1.gql `
  input DeliveryInput {
    isEnvelopeSize: Boolean
    title: String
    value: Float
  }

  type Delivery {
    _id: String
    isEnvelopeSize: Boolean
    title: String
    value: Float
  }
`;
exports.default = DeliveryMethode;
