import { gql } from 'apollo-server-express';

export default gql`
  input CustomerLoginInput {
    email: String!
    password: String!
    recaptchaToken: String!
  }

  input CustomerRegInput {
    email: String!
    tel: String!
    firstName: String!
    lastName: String!
    password: String!
    role: Int
  }

  input CustomerUpdateInput {
    _id: String!
    email: String
    tel: String
    firstName: String
    lastName: String
    password: String
    company: CompanyInput
    billingAddress: AddressInput
    deliveryAddress: AddressInput
    customerPoints: Float
    isVerified: Boolean
    marketing: Boolean
  }

  type CustomerLogged {
    _id: String!
    customerPoints: Float
    email: String
    tel: String
    firstName: String
    lastName: String
    role: Int!
    token: String!
    tokenExpiresIn: Float
  }

  type Company {
    ico: String
    dic: String
    icdph: String
  }

  type Address {
    address: String
    city: String
    postalCode: String
    state: String
  }

  input CompanyInput {
    ico: String
    dic: String
    icdph: String
  }

  input AddressInput {
    address: String
    city: String
    postalCode: String
    state: String
  }

  type Customer {
    _id: String!
    customerPoints: Float
    email: String
    tel: String
    isVerified: Boolean
    firstName: String
    marketing: String
    lastName: String
    role: Int!
    company: Company
    billingAddress: Address
    deliveryAddress: Address
  }
`;
