import { gql } from 'apollo-server-express';

const User = gql`
  input UserLoginInput {
    email: String!
    password: String!
  }

  input UserRegInput {
    admin: Boolean
    email: String!
    firstName: String!
    lastName: String!
    password: String!
    role: Int
  }

  type User {
    _id: String!
    admin: Boolean!
    email: String
    firstName: String
    lastName: String
    role: Int!
  }

  type UserLogged {
    _id: String!
    admin: Boolean!
    email: String
    firstName: String
    lastName: String
    role: Int!
    token: String!
    tokenExpiresIn: Float
  }
`;

export default User;
