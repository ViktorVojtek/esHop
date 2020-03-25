const { gql } = require('apollo-server-express');

const Category = gql`
  type Category {
    _id: String!
    signFlag: String
    title: String!
  }
`;

module.exports = Category;
