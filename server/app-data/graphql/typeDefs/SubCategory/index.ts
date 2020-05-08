import { gql } from 'apollo-server-express';

const SubCategory = gql`
  type SubCategory {
    _id: String!
    categoryId: String!
    signFlag: String
    title: String!
  }
`;

export default SubCategory;
