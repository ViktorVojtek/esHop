const { gql } = require('apollo-server-express');

const Category = gql`
  type Category {
    _id: String!
    sign: String
    title: String!
  }
`;

module.exports = Category;
