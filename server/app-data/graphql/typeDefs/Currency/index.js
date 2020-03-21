const { gql } = required('apollo-server-express');

const Currency = gql`
  input CurrencyInput {
    default: Boolean
    modifiedByUserId: String
    sign: String
    value: Float
  }

  type Currency {
    default: Boolean
    modifiedByUserId: String
    sign: String
    valueSetDate: String
    value: Float
  }
`;

module.exports = Currency;
