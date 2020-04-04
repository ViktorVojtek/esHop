const { gql } = require('apollo-server-express');

const Product = gql`
  input ProductImageInput {
    base64: String
    ext: String
    size: String
    title: String
  }

  input ProductPriceInput {
    currency: String
    currencySign: String
    value: Float
  }

  input ProductInput {
    category: String
    description: String
    discount: Float
    inStock: Int
    modifiedByUserId: String
    shortDescription: String
    subCategory: String
    images: [ProductImageInput]
    note: String
    price: ProductPriceInput
    title: String
  }

  type ProductImage {
    path: String
    ext: String
    size: String
    title: String
  }

  type ProductPrice {
    currency: String
    currencySign: String
    value: Float
  }

  type Product {
    category: String
    dateCreated: String
    dateDeleted: String
    dateModified: String
    description: String
    deleted: Boolean
    discount: Float
    inStock: Int
    modifiedByUserId: String
    shortDescription: String
    subCategory: String
    images: [ProductImage]
    note: String
    price: ProductPrice
    title: String
  }
`;

module.exports = Product;
