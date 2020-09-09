import { gql } from 'apollo-server-express';

const Discount = gql`
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

export default Discount;
