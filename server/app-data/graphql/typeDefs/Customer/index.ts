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
    customerPoints: Float
    isVerified: Boolean
    marketing: Boolean
    companyDTAXNum: String
    companyDVATNum: String
    companyName: String
    companyVatNum: String
    address: String
    city: String
    postalCode: String
    state: String
    optionalAddress: String
    optionalCity: String
    optionalPostalCode: String
    optionalState: String
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
    companyDTAXNum: String
    companyDVATNum: String
    companyName: String
    companyVatNum: String
    address: String
    city: String
    postalCode: String
    state: String
    optionalAddress: String
    optionalCity: String
    optionalPostalCode: String
    optionalState: String
  }
`;
