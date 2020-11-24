import { gql } from 'apollo-server-express';

const LoyalityProduct = gql`
  type LoyalityProduct {
    _id: String!
    costPoints: Int
    dateCreated: String
    isDiscount: Boolean
    title: String
  }
`;

export default LoyalityProduct;
