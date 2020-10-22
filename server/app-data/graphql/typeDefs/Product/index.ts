import { gql } from 'apollo-server-express';

const Product = gql`
  input ProductImageInput {
    base64: String
    ext: String
    path: String
    size: String
    title: String
  }

  input CategoryTypeInput {
    id: String
    title: String
  }

  input ProductPriceInput {
    currency: String!
    value: Float!
  }

  input ProductVariantInput {
    default: Boolean
    description: String
    inStock: Int
    images: [ProductImageInput]
    discount: Int
    title: String!
    price: ProductPriceInput!
    productCode: String
  }

  input ProductInput {
    category: CategoryTypeInput
    modifiedByUserId: String
    isEnvelopeSize: Boolean
    subCategory: CategoryTypeInput
    title: String
    variants: [ProductVariantInput]
  }

  type ProductImage {
    path: String
    ext: String
    imgId: String
    size: String
    title: String
  }

  type ProductPrice {
    currency: String
    value: Float
  }

  type ProductVariant {
    default: Boolean
    description: String
    discount: Int
    itemsInStock: Int
    images: [ProductImage]
    inStock: Int
    title: String
    price: ProductPrice
    productCode: String
  }

  type CategoryType {
    id: String
    title: String
  }

  type Product {
    _id: String!
    category: CategoryType
    dateCreated: String
    dateDeleted: String
    dateModified: String
    deleted: Boolean
    isEnvelopeSize: Boolean
    modifiedByUserId: String
    subCategory: CategoryType
    title: String
    variants: [ProductVariant]
  }
`;

export default Product;
