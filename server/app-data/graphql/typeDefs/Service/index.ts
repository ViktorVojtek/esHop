import { gql } from 'apollo-server-express';

export default gql`
  input ServiceCategoryTypeInput {
    id: String
    title: String
  }

  input ServiceImageInput {
    base64: String
    ext: String
    path: String
    size: String
    title: String
  }

  input ServiceInput {
    category: ServiceCategoryTypeInput
    html: String
    img: ServiceImageInput
    subCategory: ServiceCategoryTypeInput
    price: Float
    video: String
    title: String
  }

  type ServiceCategory {
    id: String
    title: String
  }

  type ServiceImage {
    path: String
    ext: String
    imgId: String
    size: String
    title: String
  }

  type Service {
    category: ServiceCategory
    html: String
    img: ServiceImage
    price: Float
    subCategory: ServiceCategory
    video: String
    title: String
  }
`;
