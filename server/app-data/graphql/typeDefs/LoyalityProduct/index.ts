import { gql } from 'apollo-server-express';

const LoyalityProduct = gql`
  input LoyalityProductInput {
    costPoints: Int
    discount: Int
    isDiscount: Boolean
    image: [LoyalityProductImageInput]
    title: String
  }

  input LoyalityProductImageInput {
    base64: String
    ext: String
    size: String
    title: String
  }

  type LoyalityProduct {
    _id: String!
    costPoints: Int
    dateCreated: String
    discount: Int
    isDiscount: Boolean
    image: String
    title: String
  }
`;

export default LoyalityProduct;
