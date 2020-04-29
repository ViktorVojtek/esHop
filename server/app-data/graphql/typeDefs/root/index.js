const { gql } = require('apollo-server-express');

const rootTypeDefs = gql`
  type Query {
    categories: [Category]
    currencies: [Currency]
    orders: [Order]
    order: Order
    products: [Product]
    product(id: String!): Product
    subCategories: [SubCategory]
    users: [User]
  }

  type Mutation {
    createCategory(title: String!): Category
    updateCategory(_id: String!, title: String!): Category
    removeCategory(_id: String!): String

    createOrder(data: OrderInput!): Order

    setCurrency(currencyInput: CurrencyInput!): Currency
    updateCurrency(currencyUpdateInput: CurrencyUpdateInput!): Currency
    removeCurrency(_id: String!): String

    loginUser(userLoginInput: UserLoginInput!): UserLogged
    registerUser(userRegInput: UserRegInput!): User

    createProduct(productInput: ProductInput!): Product
    updateProduct(_id: String!, productInput: ProductInput!): Product
    removeProduct(_id: String!): String

    createSubCategory(title: String!): SubCategory
    removeSubCategory(_id: String!): String
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = rootTypeDefs;
