import { gql } from 'apollo-server-express';

export default gql`
  input MarketingListInput {
    email: String!
    tel: String!
    firstName: String!
    lastName: String!
  }

  type MarketingList {
    _id: String!
    email: String
    tel: String
    firstName: String
    lastName: String
  }
`;
