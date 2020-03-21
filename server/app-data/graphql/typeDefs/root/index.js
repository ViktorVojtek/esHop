const { gql } = require('apollo-server-express');

const rootTypeDefs = gql`
  type Query {
    categories: [Category]
    users: [User]
  }

  type Mutation {
    createCategory(title: String!): Category
    loginUser(userLoginInput: UserLoginInput!): UserLogged
    registerUser(userRegInput: UserRegInput!): User
    updateCategory(_id: String!, title: String!): Category
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = rootTypeDefs;
