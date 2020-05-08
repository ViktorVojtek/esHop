import { gql } from 'apollo-server-express';

const Category = gql`
  type Category {
    _id: String!
    signFlag: String
    title: String!
  }
`;

export default Category;
