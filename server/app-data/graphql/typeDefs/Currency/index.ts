import { gql } from 'apollo-server-express';

const Currency = gql`
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

export default Currency;
