const { gql } = require('apollo-server-express');

const Product = gql`
  input ProductImageInput {
    base64: String
    ext: String
    path: String
    size: String
    title: String
  }

  input ProductPriceInput {
    currency: String!
    currencySign: String!
    discount: Int
    value: Float!
  }

  input ProductVariantInput {
    default: Boolean
    itemsInStock: Int
    title: String!
    price: ProductPriceInput!
  }

  input ProductInput {
    category: String
    description: String
    inStock: Boolean
    modifiedByUserId: String
    shortDescription: String
    subCategory: String
    images: [ProductImageInput]
    note: String
    title: String
    variant: [ProductVariantInput]
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
    currencySign: String
    discount: Int
    value: Float
  }

  type ProductVariant {
    default: Boolean
    itemsInStock: Int
    title: String
    price: ProductPrice
  }

  type Product {
    _id: String!
    category: String
    dateCreated: String
    dateDeleted: String
    dateModified: String
    description: String
    deleted: Boolean
    inStock: Boolean
    modifiedByUserId: String
    shortDescription: String
    subCategory: String
    images: [ProductImage]
    note: String
    title: String
    variant: [ProductVariant]
  }
`;

module.exports = Product;
