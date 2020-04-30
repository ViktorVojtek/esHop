const { gql } = require('apollo-server-express');

const SubCategory = gql`
  type SubCategory {
    _id: String!
    categoryId: String!
    signFlag: String
    title: String!
  }
`;

module.exports = SubCategory;
