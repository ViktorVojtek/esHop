import { gql } from 'apollo-server-express';

const SubCategory = gql`
  input SubCategoryInput {
    categoryId: String
    title: String
    image: SubCategoryImageInput
    forReservation: Boolean
    forSale: Boolean
    forGiftCard: Boolean
    forGiftBasket: Boolean
  }
  input SubCategoryImageInput {
    base64: String
    ext: String
    path: String
    size: String
    title: String
  }

  type SubCategoryImage {
    path: String
    ext: String
    size: String
    title: String
  }

  type SubCategory {
    _id: String!
    categoryId: String!
    signFlag: String
    title: String!
    image: SubCategoryImage
    forReservation: Boolean!
    forSale: Boolean!
    forGiftCard: Boolean!
    forGiftBasket: Boolean!
  }
`;

export default SubCategory;
