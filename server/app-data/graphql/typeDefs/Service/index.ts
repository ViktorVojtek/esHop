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

  input ServicePriceInput {
    currency: String
    value: Float
  }

  input ServiceInput {
    category: ServiceCategoryTypeInput
    html: String
    discount: Float
    img: ServiceImageInput
    subCategory: ServiceCategoryTypeInput
    price: ServicePriceInput
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

  type ServicePrice {
    currency: String
    value: Float
  }

  type Service {
    _id: String
    category: ServiceCategory
    discount: Float
    html: String
    img: ServiceImage
    price: ServicePrice
    subCategory: ServiceCategory
    video: String
    title: String
  }
`;
