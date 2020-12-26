import { gql } from 'apollo-server-express';

const FreeDelivery = gql`
  type FreeDelivery {
    _id: String
    value: Float
  }
`;

export default FreeDelivery;
