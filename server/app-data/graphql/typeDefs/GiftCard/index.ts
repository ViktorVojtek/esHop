import { gql } from 'apollo-server-express';

const GiftCard = gql`
  input GiftCardInput {
    title: String
    image: GiftCardImageInput
    textColor: String
    borderColor: String
  }
  input GiftCardImageInput {
    base64: String
    ext: String
    path: String
    size: String
    title: String
  }

  type GiftCardImage {
    path: String
    ext: String
    size: String
    title: String
  }

  type GiftCard {
    _id: String!
    title: String!
    image: SubCategoryImage!
    textColor: String!
    borderColor: String!
  }
`;

export default GiftCard;
