import { gql } from 'apollo-server-express';

const RezervationData = gql`
  input RezervationDataInput {
    firstName: String
    lastName: String
    email: String
    service: String
    message: String
  }

  type RezervationData {
    firstName: String
    lastName: String
    email: String
    service: String
    message: String
  }
`;

export default RezervationData;
