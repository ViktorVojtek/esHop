import { gql } from 'apollo-server-express';

export default gql`
  input CustomerLoginInput {
    email: String!
    password: String!
  }

  input CustomerRegInput {
    email: String!
    firstName: String!
    lastName: String!
    password: String!
    role: Int
  }

  type Customer {
    _id: String!
    customerPoints: Float
    email: String
    firstName: String
    lastName: String
    role: Int!
  }

  type CustomerLogged {
    _id: String!
    customerPoints: Float
    email: String
    firstName: String
    lastName: String
    role: Int!
    token: String!
    tokenExpiresIn: Float
  }
`;
